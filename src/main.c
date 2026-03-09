#include <pebble.h>

// ============================================================
// MONOGRAM — skeleton scaffold
// Based on Radium 2. No shake/art mode. Overlay always visible.
// Round: digits fill overlay circle, no day/date on face.
// Rect:  digits in overlay circle, day/date above/below circle.
// Digit assets (10 digits x 4 positions) not yet implemented —
// placeholder text renders in the overlay until assets are ready.
// ============================================================

#define SETTINGS_KEY      1
#define DEFAULT_STEP_GOAL 10000
#define RING_GAP          2
#define RING_THICK        6

// ============================================================
// SETTINGS
// ============================================================
typedef struct {
  GColor TimeTextColor;
  GColor DateTextColor;
  GColor LitBatteryColor;
  GColor LitStepsColor;
  GColor DimBatteryColor;
  GColor DimStepsColor;
  GColor BackgroundColor;
  GColor OverlayBgColor;
  int    StepGoal;
  bool   InvertBW;
  bool   ShowRing;
} MonogramSettings;

static MonogramSettings s_settings;

static void prv_default_settings(void) {
  s_settings.BackgroundColor = GColorBlack;
  s_settings.OverlayBgColor  = GColorBlack;
#if defined(PBL_COLOR)
  s_settings.TimeTextColor   = GColorWhite;
  s_settings.DateTextColor   = GColorWhite;
  s_settings.LitBatteryColor = GColorMintGreen;
  s_settings.LitStepsColor   = GColorMintGreen;
  s_settings.DimBatteryColor = GColorDarkGray;
  s_settings.DimStepsColor   = GColorDarkGray;
#else
  s_settings.TimeTextColor   = GColorWhite;
  s_settings.DateTextColor   = GColorWhite;
  s_settings.LitBatteryColor = GColorWhite;
  s_settings.LitStepsColor   = GColorWhite;
  s_settings.DimBatteryColor = GColorDarkGray;
  s_settings.DimStepsColor   = GColorDarkGray;
#endif
  s_settings.StepGoal  = DEFAULT_STEP_GOAL;
  s_settings.InvertBW  = false;
  s_settings.ShowRing  = true;
}

static void prv_save_settings(void) {
  persist_write_data(SETTINGS_KEY, &s_settings, sizeof(s_settings));
}

static void prv_load_settings(void) {
  prv_default_settings();
  persist_read_data(SETTINGS_KEY, &s_settings, sizeof(s_settings));
}

// ============================================================
// STATE
// ============================================================
static Window *s_window;
static Layer  *s_canvas_layer;

static int  s_hour    = 0;
static int  s_minute  = 0;
static int  s_battery = 100;
static int  s_steps   = 0;

static char s_time_buffer[8];
static char s_day_buffer[12];
static char s_date_buffer[10];

// ============================================================
// HELPERS
// ============================================================
static const char *get_day_name(int wday) {
  static const char *days[] = {
    "SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"
  };
  return (wday >= 0 && wday < 7) ? days[wday] : "";
}

static const char *get_month_abbr(int mon) {
  static const char *months[] = {
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  };
  return (mon >= 0 && mon < 12) ? months[mon] : "";
}

// ============================================================
// DRAW
// ============================================================
static void draw_layer(Layer *layer, GContext *ctx) {
  GRect bounds = layer_get_unobstructed_bounds(layer);
  int w  = bounds.size.w;
  int h  = bounds.size.h;
  int cx = w / 2;
  int cy = h / 2;

#if defined(PBL_ROUND)
  const bool is_round = true;
#else
  const bool is_round = false;
#endif

  // ----------------------------------------------------------
  // EFFECTIVE COLORS
  // ----------------------------------------------------------
#if defined(PBL_BW)
  GColor bw_lit   = s_settings.InvertBW ? GColorBlack     : GColorWhite;
  GColor bw_dim   = s_settings.InvertBW ? GColorLightGray : GColorDarkGray;
  GColor col_bg   = s_settings.InvertBW ? GColorWhite     : GColorBlack;
  GColor col_fg   = s_settings.InvertBW ? GColorBlack     : GColorWhite;
  GColor col_dfg  = col_fg;
  GColor col_batt = bw_lit;
  GColor col_step = bw_lit;
  GColor col_dbatt = bw_dim;
  GColor col_dstep = bw_dim;
  GColor col_obg  = col_bg;
#else
  GColor col_bg   = s_settings.BackgroundColor;
  GColor col_fg   = s_settings.TimeTextColor;
  GColor col_dfg  = s_settings.DateTextColor;
  GColor col_batt = s_settings.LitBatteryColor;
  GColor col_step = s_settings.LitStepsColor;
  GColor col_dbatt = s_settings.DimBatteryColor;
  GColor col_dstep = s_settings.DimStepsColor;
  GColor col_obg  = s_settings.OverlayBgColor;
#endif

  bool show_ring = s_settings.ShowRing;

  // ----------------------------------------------------------
  // BACKGROUND
  // ----------------------------------------------------------
  graphics_context_set_fill_color(ctx, col_bg);
  graphics_fill_rect(ctx, bounds, 0, GCornerNone);

  // ----------------------------------------------------------
  // OUTER RING: battery (right) + steps (left)
  // ----------------------------------------------------------
  if (show_ring) {
    int step_pct = (s_settings.StepGoal > 0)
      ? (s_steps * 100) / s_settings.StepGoal : 0;
    if (step_pct > 100) step_pct = 100;

    if (is_round) {
      graphics_context_set_fill_color(ctx, col_dbatt);
      graphics_fill_radial(ctx, bounds, GOvalScaleModeFitCircle, RING_THICK,
                           DEG_TO_TRIGANGLE(3),   DEG_TO_TRIGANGLE(177));
      graphics_context_set_fill_color(ctx, col_dstep);
      graphics_fill_radial(ctx, bounds, GOvalScaleModeFitCircle, RING_THICK,
                           DEG_TO_TRIGANGLE(183), DEG_TO_TRIGANGLE(357));
      if (s_battery > 0) {
        graphics_context_set_fill_color(ctx, col_batt);
        graphics_fill_radial(ctx, bounds, GOvalScaleModeFitCircle, RING_THICK,
                             DEG_TO_TRIGANGLE(177 - 174 * s_battery / 100),
                             DEG_TO_TRIGANGLE(177));
      }
      if (step_pct > 0) {
        graphics_context_set_fill_color(ctx, col_step);
        graphics_fill_radial(ctx, bounds, GOvalScaleModeFitCircle, RING_THICK,
                             DEG_TO_TRIGANGLE(183),
                             DEG_TO_TRIGANGLE(183 + 174 * step_pct / 100));
      }
    } else {
      int t      = RING_THICK;
      int gap    = 5;
      int half_w = cx - gap;
      int total  = half_w + h + half_w;

      graphics_context_set_fill_color(ctx, col_bg);
      graphics_fill_rect(ctx, GRect(0,   0,   w, t), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(0,   h-t, w, t), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(0,   0,   t, h), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(w-t, 0,   t, h), 0, GCornerNone);

      graphics_context_set_fill_color(ctx, col_dbatt);
      graphics_fill_rect(ctx, GRect(cx+gap, 0,   half_w, t), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(w-t,    0,   t,      h), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(cx+gap, h-t, half_w, t), 0, GCornerNone);
      {
        int filled = total * s_battery / 100;
        graphics_context_set_fill_color(ctx, col_batt);
        if (filled > 0) {
          int seg = (filled < half_w) ? filled : half_w;
          graphics_fill_rect(ctx, GRect(cx+gap+half_w-seg, h-t, seg, t), 0, GCornerNone);
          filled -= seg;
        }
        if (filled > 0) {
          int seg = (filled < h) ? filled : h;
          graphics_fill_rect(ctx, GRect(w-t, h-seg, t, seg), 0, GCornerNone);
          filled -= seg;
        }
        if (filled > 0) {
          int seg = (filled < half_w) ? filled : half_w;
          graphics_fill_rect(ctx, GRect(cx+gap, 0, seg, t), 0, GCornerNone);
        }
      }

      graphics_context_set_fill_color(ctx, col_dstep);
      graphics_fill_rect(ctx, GRect(0,   0,   half_w, t), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(0,   0,   t,      h), 0, GCornerNone);
      graphics_fill_rect(ctx, GRect(0,   h-t, half_w, t), 0, GCornerNone);
      if (step_pct > 0) {
        int filled = total * step_pct / 100;
        graphics_context_set_fill_color(ctx, col_step);
        if (filled > 0) {
          int seg = (filled < half_w) ? filled : half_w;
          graphics_fill_rect(ctx, GRect(cx-gap-seg, h-t, seg, t), 0, GCornerNone);
          filled -= seg;
        }
        if (filled > 0) {
          int seg = (filled < h) ? filled : h;
          graphics_fill_rect(ctx, GRect(0, h-seg, t, seg), 0, GCornerNone);
          filled -= seg;
        }
        if (filled > 0) {
          int seg = (filled < half_w) ? filled : half_w;
          graphics_fill_rect(ctx, GRect(0, 0, seg, t), 0, GCornerNone);
        }
      }
    }
  }

  // ----------------------------------------------------------
  // OVERLAY CIRCLE + CONTENT
  // Round: digits only, no day/date.
  // Rect:  digits in circle, day above, date below.
  //
  // TODO: replace placeholder text with monogram digit bitmaps
  // once assets are designed (10 digits x 4 positions).
  // ----------------------------------------------------------
  int overlay_r = is_round
    ? ((w >= 260) ? 110 : (w >= 180) ? 76 : 58)
    : ((w >= 200) ? 64 : 58);

  graphics_context_set_fill_color(ctx, col_obg);
  graphics_fill_circle(ctx, GPoint(cx, cy), overlay_r);

  // Placeholder: time digits as text (to be replaced by bitmap assets)
  int time_h  = 40;
  int small_h = 18;
  int spacing = 3;

  graphics_context_set_text_color(ctx, col_fg);
  graphics_draw_text(ctx, s_time_buffer,
    fonts_get_system_font(FONT_KEY_LECO_36_BOLD_NUMBERS),
    GRect(0, cy - time_h / 2 - 2, w, time_h + 4),
    GTextOverflowModeFill, GTextAlignmentCenter, NULL);

#if !defined(PBL_ROUND)
  // Day above circle
  int day_y = cy - overlay_r - small_h - spacing;
  graphics_context_set_text_color(ctx, col_dfg);
  graphics_draw_text(ctx, s_day_buffer,
    fonts_get_system_font(FONT_KEY_GOTHIC_18),
    GRect(0, day_y, w, small_h + 2),
    GTextOverflowModeFill, GTextAlignmentCenter, NULL);

  // Date below circle
  int date_y = cy + overlay_r + spacing;
  graphics_draw_text(ctx, s_date_buffer,
    fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD),
    GRect(0, date_y, w, small_h + 2),
    GTextOverflowModeFill, GTextAlignmentCenter, NULL);
#endif
}

// ============================================================
// EVENT HANDLERS
// ============================================================
static void tick_handler(struct tm *t, TimeUnits units_changed) {
  s_hour   = t->tm_hour;
  s_minute = t->tm_min;
  int disp_hour = clock_is_24h_style() ? t->tm_hour : ((t->tm_hour % 12) ?: 12);
  snprintf(s_time_buffer, sizeof(s_time_buffer), "%02d:%02d", disp_hour, t->tm_min);
  snprintf(s_day_buffer,  sizeof(s_day_buffer),  "%s", get_day_name(t->tm_wday));
  snprintf(s_date_buffer, sizeof(s_date_buffer), "%s %02d",
           get_month_abbr(t->tm_mon), t->tm_mday);
  layer_mark_dirty(s_canvas_layer);
}

static void battery_handler(BatteryChargeState state) {
  s_battery = state.charge_percent;
  layer_mark_dirty(s_canvas_layer);
}

#if defined(PBL_HEALTH)
static void update_steps(void) {
  HealthServiceAccessibilityMask mask = health_service_metric_accessible(
    HealthMetricStepCount, time_start_of_today(), time(NULL));
  s_steps = (mask & HealthServiceAccessibilityMaskAvailable)
    ? (int)health_service_sum_today(HealthMetricStepCount) : 0;
  layer_mark_dirty(s_canvas_layer);
}
static void health_handler(HealthEventType event, void *context) {
  if (event == HealthEventMovementUpdate) update_steps();
}
#endif

static void inbox_received(DictionaryIterator *iter, void *context) {
  Tuple *t;
  t = dict_find(iter, MESSAGE_KEY_TimeTextColor);
  if (t) s_settings.TimeTextColor   = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_DateTextColor);
  if (t) s_settings.DateTextColor   = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_LitBatteryColor);
  if (t) s_settings.LitBatteryColor = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_LitStepsColor);
  if (t) s_settings.LitStepsColor   = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_DimBatteryColor);
  if (t) s_settings.DimBatteryColor = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_DimStepsColor);
  if (t) s_settings.DimStepsColor   = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_BackgroundColor);
  if (t) s_settings.BackgroundColor = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_OverlayBgColor);
  if (t) s_settings.OverlayBgColor  = GColorFromHEX(t->value->int32);
  t = dict_find(iter, MESSAGE_KEY_StepGoal);
  if (t) s_settings.StepGoal        = (int)t->value->int32;
  t = dict_find(iter, MESSAGE_KEY_InvertBW);
  if (t) s_settings.InvertBW        = (t->value->int32 == 1);
  t = dict_find(iter, MESSAGE_KEY_ShowRing);
  if (t) s_settings.ShowRing        = (t->value->int32 == 1);
  prv_save_settings();
  layer_mark_dirty(s_canvas_layer);
}

// ============================================================
// WINDOW / APP LIFECYCLE
// ============================================================
static void window_load(Window *window) {
  Layer *root = window_get_root_layer(window);
  s_canvas_layer = layer_create(layer_get_bounds(root));
  layer_set_update_proc(s_canvas_layer, draw_layer);
  layer_add_child(root, s_canvas_layer);
}

static void window_unload(Window *window) {
  layer_destroy(s_canvas_layer);
}

static void init(void) {
  prv_load_settings();
  s_window = window_create();
  window_set_window_handlers(s_window, (WindowHandlers){
    .load   = window_load,
    .unload = window_unload,
  });
  window_stack_push(s_window, true);

  time_t now = time(NULL);
  tick_handler(localtime(&now), MINUTE_UNIT);

  tick_timer_service_subscribe(MINUTE_UNIT, tick_handler);
  battery_state_service_subscribe(battery_handler);
  battery_handler(battery_state_service_peek());
#if defined(PBL_HEALTH)
  health_service_events_subscribe(health_handler, NULL);
  update_steps();
#endif
  app_message_register_inbox_received(inbox_received);
  app_message_open(256, 64);
}

static void deinit(void) {
  tick_timer_service_unsubscribe();
  battery_state_service_unsubscribe();
#if defined(PBL_HEALTH)
  health_service_events_unsubscribe();
#endif
  window_destroy(s_window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
