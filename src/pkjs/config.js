module.exports = {
  buildUrl: function(platform, currentSettings) {

    // -------------------------------------------------------------------------
    // PRESETS
    // 8 color slots per preset:
    //   bg, obg                    — background, overlay bg
    //   timeText, dateText         — text colors
    //   litB, litS                 — lit ring: battery, steps
    //   dimB, dimS                 — unlit ring: battery, steps
    // -------------------------------------------------------------------------
    function p(label, bg, obg, tt, dt, lB, lS, dB, dS) {
      return { label:label, bg:bg, obg:obg, timeText:tt, dateText:dt,
               litB:lB, litS:lS, dimB:dB, dimS:dS };
    }

    var presets = [
      // ---- DARK ----
      p('Ember',      '#000000','#000000','#ffffff','#aaaaaa', '#ff5500','#ff5500','#555555','#555555'),
      p('Cobalt',     '#000000','#000000','#ffffff','#aaaaaa', '#0055ff','#0055ff','#555555','#555555'),
      p('Jade',       '#000000','#000000','#ffffff','#aaaaaa', '#00aa55','#00aa55','#555555','#555555'),
      p('Slate',      '#000000','#000000','#ffffff','#aaaaaa', '#aaaaaa','#aaaaaa','#555555','#555555'),
      p('Crimson',    '#000000','#000000','#ffffff','#aa5555', '#ff5555','#ff5555','#550000','#550000'),
      p('Ocean',      '#000000','#000000','#ffffff','#0055aa', '#00aaff','#00aaff','#0055aa','#0055aa'),
      p('Volt',       '#000000','#000000','#ffffff','#aaaa55', '#ffff00','#ffff00','#555500','#555500'),
      p('Dusk',       '#000000','#000000','#ffffff','#aa00aa', '#ff55ff','#ff55ff','#550055','#550055'),
      // ---- LIGHT ----
      p('Paper',      '#ffffff','#ffffff','#000000','#555555', '#000000','#000000','#aaaaaa','#aaaaaa'),
      p('Mint',       '#ffffff','#ffffff','#000000','#005500', '#005500','#005500','#aaffaa','#aaffaa'),
      p('Rose',       '#ffffff','#ffffff','#550000','#550000', '#550000','#550000','#ffaaaa','#ffaaaa'),
      p('Sky',        '#ffffff','#ffffff','#000000','#0000aa', '#0000aa','#0000aa','#aaaaff','#aaaaff'),
      p('Sapphire',   '#ffffff','#ffffff','#000000','#555555', '#0055aa','#0055aa','#aaaaaa','#aaaaaa'),
      p('Ruby',       '#ffffff','#ffffff','#000000','#555555', '#aa0000','#aa0000','#aaaaaa','#aaaaaa'),
      p('Sepia',      '#ffffaa','#ffffaa','#000000','#aa5500', '#550000','#550000','#ffaa55','#ffaa55'),
      p('Ash',        '#555555','#555555','#ffffff','#ffffff', '#ffffff','#ffffff','#aaaaaa','#aaaaaa'),
      // ---- COLOR ----
      p('Teal',       '#00aaaa','#00aaaa','#ffffff','#ffffff', '#ffffff','#ffffff','#005555','#005555'),
      p('Flame',      '#ff5500','#ff5500','#ffffff','#ffffff', '#ffffff','#ffffff','#aa5500','#aa5500'),
      p('Plum',       '#550055','#550055','#ffffff','#ff55ff', '#ff55ff','#ff55ff','#aa00aa','#aa00aa'),
      p('Forest',     '#005500','#005500','#ffffff','#55ff00', '#55ff00','#55ff00','#55aa00','#55aa00'),
      p('Midnight',   '#0000aa','#0000aa','#aaaaff','#aaaaff', '#00ffff','#aaaaff','#0055aa','#0055aa'),
      p('Cinnabar',   '#550000','#550000','#ffffff','#ffaa55', '#ffaa55','#ff5500','#aa0000','#aa0000'),
      p('Horizon',    '#000000','#0000aa','#ffaa55','#aaaaaa', '#0055ff','#ff5500','#0000aa','#550000'),
      p('Solar',      '#000000','#000000','#ffffff','#ffaa00', '#ffaa00','#aaff00','#555500','#005500'),
    ];

    // -------------------------------------------------------------------------
    // PALETTE
    // -------------------------------------------------------------------------
    var palette = [
      '#000000','#555555','#aaaaaa','#ffffff','#550000','#aa5555','#aa0000','#ffaaaa',
      '#ff5555','#ff0000','#aa5500','#ffaa55','#ff5500','#ffaa00','#555500','#aaaa55',
      '#aaaa00','#ffffaa','#ffff55','#ffff00','#55aa00','#aaff55','#55ff00','#aaff00',
      '#005500','#55aa55','#00aa00','#aaffaa','#55ff55','#00ff00','#00aa55','#55ffaa',
      '#00ff55','#00ffaa','#005555','#55aaaa','#00aaaa','#aaffff','#55ffff','#00ffff',
      '#0055aa','#55aaff','#0055ff','#00aaff','#000055','#5555aa','#0000aa','#aaaaff',
      '#5555ff','#0000ff','#5500aa','#aa55ff','#5500ff','#aa00ff','#550055','#aa55aa',
      '#aa00aa','#ffaaff','#ff55ff','#ff00ff','#aa0055','#ff55aa','#ff0055','#ff00aa',
    ];
    var paletteNames = {
      '#000000':'GColorBlack','#000055':'GColorOxfordBlue','#0000aa':'GColorDukeBlue','#0000ff':'GColorBlue',
      '#005500':'GColorDarkGreen','#005555':'GColorMidnightGreen','#0055aa':'GColorCobaltBlue','#0055ff':'GColorBlueMoon',
      '#00aa00':'GColorIslamicGreen','#00aa55':'GColorJaegerGreen','#00aaaa':'GColorTiffanyBlue','#00aaff':'GColorVividCerulean',
      '#00ff00':'GColorGreen','#00ff55':'GColorMalachite','#00ffaa':'GColorMediumSpringGreen','#00ffff':'GColorCyan',
      '#550000':'GColorBulgarianRose','#550055':'GColorImperialPurple','#5500aa':'GColorIndigo','#5500ff':'GColorElectricUltramarine',
      '#555500':'GColorArmyGreen','#555555':'GColorDarkGray','#5555aa':'GColorLiberty','#5555ff':'GColorVeryLightBlue',
      '#55aa00':'GColorKellyGreen','#55aa55':'GColorMayGreen','#55aaaa':'GColorCadetBlue','#55aaff':'GColorPictonBlue',
      '#55ff00':'GColorBrightGreen','#55ff55':'GColorScreaminGreen','#55ffaa':'GColorMediumAquamarine','#55ffff':'GColorElectricBlue',
      '#aa0000':'GColorDarkCandyAppleRed','#aa0055':'GColorJazzberryJam','#aa00aa':'GColorPurple','#aa00ff':'GColorVividViolet',
      '#aa5500':'GColorWindsorTan','#aa5555':'GColorRoseVale','#aa55aa':'GColorPurpureus','#aa55ff':'GColorLavenderIndigo',
      '#aaaa00':'GColorLimerick','#aaaa55':'GColorBrass','#aaaaaa':'GColorLightGray','#aaaaff':'GColorBabyBlueEyes',
      '#aaff00':'GColorSpringBud','#aaff55':'GColorInchworm','#aaffaa':'GColorMintGreen','#aaffff':'GColorCeleste',
      '#ff0000':'GColorRed','#ff0055':'GColorFolly','#ff00aa':'GColorFashionMagenta','#ff00ff':'GColorMagenta',
      '#ff5500':'GColorOrange','#ff5555':'GColorSunsetOrange','#ff55aa':'GColorBrilliantRose','#ff55ff':'GColorShockingPink',
      '#ffaa00':'GColorChromeYellow','#ffaa55':'GColorRajah','#ffaaaa':'GColorMelon','#ffaaff':'GColorRichBrilliantLavender',
      '#ffff00':'GColorYellow','#ffff55':'GColorIcterine','#ffffaa':'GColorPastelYellow','#ffffff':'GColorWhite'
    };

    var platformData = 'var PLATFORM=' + JSON.stringify(platform || 'color') + ';'
      + 'var CURRENT=' + JSON.stringify(currentSettings || null) + ';';
    var presetsData = 'var PRESETS=' + JSON.stringify(presets) + ';';
    var paletteData = 'var PALETTE=' + JSON.stringify(palette) + ';var PALETTE_NAMES=' + JSON.stringify(paletteNames) + ';';

    var presetRows = [
      { label: 'Dark',  presets: presets.slice(0,  8) },
      { label: 'Light', presets: presets.slice(8,  16) },
      { label: 'Color', presets: presets.slice(16, 24) },
    ];
    var presetsHtml = presetRows.map(function(row) {
      var rowItems = row.presets.map(function(p) {
        var i = presets.indexOf(p);
        return '<div class="preset" onclick="applyPreset(' + i + ')" style="background:' + p.bg + ';border:2px solid ' + p.litB + '">'
          + '<div class="preset-pip" style="background:' + p.litB + '"></div>'
          + '<div class="preset-label" style="color:' + p.timeText + '">' + p.label + '</div>'
          + '</div>';
      }).join('');
      return '<div class="preset-row-label">' + row.label + '</div>'
        + '<div class="preset-row">' + rowItems + '</div>';
    }).join('');

    // -------------------------------------------------------------------------
    // HTML
    // -------------------------------------------------------------------------
    var html = '<!DOCTYPE html><html><head>'
      + '<meta name="viewport" content="width=device-width,initial-scale=1">'
      + '<title>Monogram</title>'
      + '<style>'
      + '*{box-sizing:border-box}'
      + 'body{font-family:sans-serif;background:#111;color:#fff;margin:0;padding:16px;max-width:480px}'
      + 'h1{font-size:24px;margin:0 0 2px;letter-spacing:-0.5px}'
      + 'p.sub{color:#555;font-size:13px;margin:0 0 20px}'
      + 'h2{font-size:11px;text-transform:uppercase;color:#555;letter-spacing:1.5px;margin:20px 0 6px}'
      + '.card{background:#1a1a1a;border-radius:10px;overflow:hidden;margin-bottom:8px}'
      + '.row{display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-bottom:1px solid #222}'
      + '.row:last-child{border-bottom:none}'
      + '.row label{font-size:15px;color:#ddd;flex:1}'
      + '.row .right{display:flex;align-items:center;gap:8px}'
      + '.swatch{width:36px;height:28px;border-radius:5px;cursor:pointer;border:2px solid #333;flex-shrink:0}'
      + '.expand-row{display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-bottom:1px solid #222;cursor:pointer;user-select:none}'
      + '.expand-row:last-child{border-bottom:none}'
      + '.expand-row label{font-size:15px;color:#ddd;flex:1;cursor:pointer}'
      + '.expand-row .right{display:flex;align-items:center;gap:8px}'
      + '.expand-btn{font-size:18px;color:#555;line-height:1;width:24px;text-align:center;transition:transform .2s}'
      + '.expand-btn.open{transform:rotate(45deg);color:#ffffff}'
      + '.sub-rows{display:none;background:#141414}'
      + '.sub-rows.open{display:block}'
      + '.sub-row{display:flex;align-items:center;justify-content:space-between;padding:9px 14px 9px 28px;border-bottom:1px solid #1e1e1e}'
      + '.sub-row:last-child{border-bottom:none}'
      + '.sub-row label{font-size:14px;color:#aaa;flex:1}'
      + '.toggle{position:relative;width:44px;height:26px;flex-shrink:0}'
      + '.toggle input{opacity:0;width:0;height:0}'
      + '.knob{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#333;border-radius:13px;transition:.2s}'
      + '.knob:before{content:"";position:absolute;width:20px;height:20px;left:3px;bottom:3px;background:#666;border-radius:50%;transition:.2s}'
      + 'input:checked+.knob{background:#ffffff}'
      + 'input:checked+.knob:before{transform:translateX(18px);background:#000}'
      + '.slider-wrap{padding:10px 14px}'
      + '.slider-lbl{font-size:15px;color:#ddd;display:flex;justify-content:space-between;margin-bottom:8px}'
      + '.slider-lbl span{color:#ffffff;font-weight:bold}'
      + 'input[type=range]{width:100%;accent-color:#ffffff}'
      + '.note{font-size:12px;color:#444;padding:4px 14px 10px;display:block}'
      + '.presets{padding:4px 14px 10px}'
      + '.preset-row-label{font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#888;padding:8px 0 4px}'
      + '.preset-row{display:flex;gap:6px;margin-bottom:4px}'
      + '.preset{flex:1;border-radius:8px;padding:8px 2px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px}'
      + '.preset:active{opacity:0.7}'
      + '.preset-pip{width:20px;height:3px;border-radius:2px}'
      + '.preset-label{font-size:10px}'
      + '.modal-bg{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.8);z-index:100;align-items:center;justify-content:center}'
      + '.modal-bg.open{display:flex}'
      + '.modal{background:#1a1a1a;border-radius:12px;padding:16px;width:90%;max-width:340px}'
      + '.modal h3{margin:0 0 12px;font-size:14px;color:#aaa;text-transform:uppercase;letter-spacing:1px}'
      + '.palette{display:grid;grid-template-columns:repeat(8,1fr);gap:4px}'
      + '.pal-swatch{width:100%;aspect-ratio:1;border-radius:3px;cursor:pointer;border:2px solid transparent}'
      + '.pal-swatch:hover,.pal-swatch.selected{border-color:#fff}'
      + '.modal-cancel{margin-top:12px;width:100%;padding:10px;background:#333;color:#aaa;border:none;border-radius:7px;font-size:14px;cursor:pointer}'
      + 'button.save{display:block;width:100%;padding:14px;background:#ffffff;color:#000;border:none;border-radius:8px;font-size:17px;font-weight:bold;cursor:pointer;margin-top:24px}'
      + 'button.save:active{opacity:0.8}'
      + '</style></head><body>'

      + '<h1>Monogram</h1><p class="sub">Watchface Configuration</p>'

      // PRESETS
      + '<h2>Presets</h2><div class="card"><div class="presets">' + presetsHtml + '</div></div>'

      // COLORS
      + '<div id="color-section">'
      + '<h2>Colors</h2><div class="card">'

      // Text
      + '<div class="expand-row" onclick="toggle(\'text\')">'
      + '<label>Text</label>'
      + '<div class="right"><div class="swatch" id="sw-TextAll" onclick="openPicker(\'TextAll\');event.stopPropagation()"></div><span class="expand-btn" id="btn-text">+</span></div>'
      + '</div>'
      + '<div class="sub-rows" id="sub-text">'
      + '<div class="sub-row"><label>Time</label><div class="swatch" id="sw-TimeTextColor" onclick="openPicker(\'TimeTextColor\')"></div></div>'
      + '<div class="sub-row"><label>Date &amp; Day</label><div class="swatch" id="sw-DateTextColor" onclick="openPicker(\'DateTextColor\')"></div></div>'
      + '</div>'

      // Ring (lit)
      + '<div class="expand-row" onclick="toggle(\'litring\')">'
      + '<label>Ring</label>'
      + '<div class="right"><div class="swatch" id="sw-LitRing" onclick="openPicker(\'LitRing\');event.stopPropagation()"></div><span class="expand-btn" id="btn-litring">+</span></div>'
      + '</div>'
      + '<div class="sub-rows" id="sub-litring">'
      + '<div class="sub-row"><label>Battery</label><div class="swatch" id="sw-LitBatteryColor" onclick="openPicker(\'LitBatteryColor\')"></div></div>'
      + '<div class="sub-row"><label>Steps</label><div class="swatch" id="sw-LitStepsColor" onclick="openPicker(\'LitStepsColor\')"></div></div>'
      + '</div>'

      // Ring (unlit)
      + '<div class="expand-row" onclick="toggle(\'dimring\')">'
      + '<label>Ring (unlit)</label>'
      + '<div class="right"><div class="swatch" id="sw-DimRing" onclick="openPicker(\'DimRing\');event.stopPropagation()"></div><span class="expand-btn" id="btn-dimring">+</span></div>'
      + '</div>'
      + '<div class="sub-rows" id="sub-dimring">'
      + '<div class="sub-row"><label>Battery</label><div class="swatch" id="sw-DimBatteryColor" onclick="openPicker(\'DimBatteryColor\')"></div></div>'
      + '<div class="sub-row"><label>Steps</label><div class="swatch" id="sw-DimStepsColor" onclick="openPicker(\'DimStepsColor\')"></div></div>'
      + '</div>'

      // Base
      + '<div class="expand-row" onclick="toggle(\'base\')">'
      + '<label>Base</label>'
      + '<div class="right"><div class="swatch" id="sw-BaseAll" onclick="openPicker(\'BaseAll\');event.stopPropagation()"></div><span class="expand-btn" id="btn-base">+</span></div>'
      + '</div>'
      + '<div class="sub-rows" id="sub-base">'
      + '<div class="sub-row"><label>Background</label><div class="swatch" id="sw-BackgroundColor" onclick="openPicker(\'BackgroundColor\')"></div></div>'
      + '<div class="sub-row"><label>Overlay</label><div class="swatch" id="sw-OverlayBgColor" onclick="openPicker(\'OverlayBgColor\')"></div></div>'
      + '</div>'

      + '</div></div>'  // end colors card + color-section

      // B&W
      + '<div id="bw-section">'
      + '<h2>Display</h2><div class="card">'
      + '<div class="row"><label>Invert (white bg, black digits)</label>'
      + '<label class="toggle"><input type="checkbox" id="InvertBW"><span class="knob"></span></label></div>'
      + '</div></div>'

      // Ring toggle
      + '<h2>Outer Ring</h2><div class="card">'
      + '<div class="row"><label>Show battery &amp; steps ring</label>'
      + '<label class="toggle"><input type="checkbox" id="ShowRing" checked><span class="knob"></span></label></div>'
      + '</div>'

      // Health
      + '<h2>Health</h2><div class="card">'
      + '<div class="slider-wrap">'
      + '<div class="slider-lbl">Daily Step Goal <span id="goalVal">10,000</span></div>'
      + '<input type="range" id="StepGoal" min="1000" max="30000" step="500" value="10000"'
      + ' oninput="document.getElementById(\'goalVal\').textContent=parseInt(this.value).toLocaleString()">'
      + '</div></div>'

      + '<button class="save" onclick="save()">Save to Watch</button>'

      // Modal
      + '<div class="modal-bg" id="modal"><div class="modal">'
      + '<h3 id="modal-title">Pick a color</h3>'
      + '<div class="palette" id="palette-grid"></div>'
      + '<button class="modal-cancel" onclick="closePicker()">Cancel</button>'
      + '</div></div>'

      + '<script>'
      + platformData + presetsData + paletteData

      + 'var colors={'
      + 'BackgroundColor:"#000000",'
      + 'OverlayBgColor:"#000000",'
      + 'TimeTextColor:"#ffffff",'
      + 'DateTextColor:"#aaaaaa",'
      + 'LitBatteryColor:"#ffffff",'
      + 'LitStepsColor:"#ffffff",'
      + 'DimBatteryColor:"#555555",'
      + 'DimStepsColor:"#555555"'
      + '};'

      + 'var cascadeMap={'
      + '"LitRing":["LitBatteryColor","LitStepsColor"],'
      + '"DimRing":["DimBatteryColor","DimStepsColor"],'
      + '"TextAll":["TimeTextColor","DateTextColor"],'
      + '"BaseAll":["BackgroundColor","OverlayBgColor"]'
      + '};'

      + 'function updateSwatches(key,hex){'
      + 'colors[key]=hex;'
      + 'var el=document.getElementById("sw-"+key);if(el)el.style.background=hex;'
      + 'function setSplit(id,a,b){var e=document.getElementById(id);if(e)e.style.background="linear-gradient(135deg,"+a+" 50%,"+b+" 50%)"}'
      + 'setSplit("sw-LitRing",  colors.LitBatteryColor, colors.LitStepsColor);'
      + 'setSplit("sw-DimRing",  colors.DimBatteryColor, colors.DimStepsColor);'
      + 'setSplit("sw-TextAll",  colors.TimeTextColor,   colors.DateTextColor);'
      + 'setSplit("sw-BaseAll",  colors.BackgroundColor, colors.OverlayBgColor);'
      + '}'

      + 'var pickerTarget=null;var pickerKeys=null;'

      + 'function openPicker(key){'
      + 'pickerTarget=key;'
      + 'pickerKeys=cascadeMap[key]||[key];'
      + 'var labels={"LitRing":"Ring","DimRing":"Ring (unlit)","TextAll":"Text","BaseAll":"Base"};'
      + 'var label=labels[key]||key.replace(/([A-Z])/g," $1").trim();'
      + 'document.getElementById("modal-title").textContent=label;'
      + 'var grid=document.getElementById("palette-grid");'
      + 'grid.innerHTML="";'
      + 'PALETTE.forEach(function(hex){'
      + 'var d=document.createElement("div");'
      + 'var curColor=colors[pickerTarget]||(pickerKeys&&colors[pickerKeys[0]]);'
      + 'd.className="pal-swatch"+(curColor===hex?" selected":"");'
      + 'd.style.background=hex;'
      + 'd.title=PALETTE_NAMES[hex]||hex;'
      + 'd.onclick=function(){pickColor(hex);};'
      + 'grid.appendChild(d);});'
      + 'document.getElementById("modal").classList.add("open");}'

      + 'function pickColor(hex){'
      + 'if(!pickerKeys)return;'
      + 'pickerKeys.forEach(function(k){updateSwatches(k,hex);});'
      + 'closePicker();}'

      + 'function closePicker(){'
      + 'document.getElementById("modal").classList.remove("open");'
      + 'pickerTarget=null;pickerKeys=null;}'

      + 'function initSwatches(){'
      + 'Object.keys(colors).forEach(function(k){updateSwatches(k,colors[k]);});}'

      + 'function loadSettings(){'
      + 'try{'
      + 'if(!CURRENT)return;'
      + 'Object.keys(CURRENT).forEach(function(k){'
      + 'if(k==="InvertBW"){document.getElementById("InvertBW").checked=!!CURRENT[k];}'
      + 'else if(k==="ShowRing"){document.getElementById("ShowRing").checked=!!CURRENT[k];}'
      + 'else if(k==="StepGoal"){var el=document.getElementById("StepGoal");el.value=CURRENT[k];document.getElementById("goalVal").textContent=parseInt(CURRENT[k]).toLocaleString();}'
      + 'else if(colors[k]!==undefined){var hex="#"+(CURRENT[k]>>>0).toString(16).padStart(6,"0");updateSwatches(k,hex);}'
      + '});'
      + '}catch(e){}}'

      + 'function applyPlatform(){'
      + 'var isColor=(PLATFORM!=="bw");'
      + 'document.getElementById("color-section").style.display=isColor?"":"none";'
      + 'document.getElementById("bw-section").style.display=isColor?"none":"";}'

      + 'function toggle(id){'
      + 'var sub=document.getElementById("sub-"+id);'
      + 'var btn=document.getElementById("btn-"+id);'
      + 'var open=sub.classList.toggle("open");'
      + 'btn.classList.toggle("open",open);}'

      + 'function applyPreset(i){'
      + 'var p=PRESETS[i];'
      + 'updateSwatches("BackgroundColor",p.bg);'
      + 'updateSwatches("OverlayBgColor",p.obg);'
      + 'updateSwatches("TimeTextColor",p.timeText);'
      + 'updateSwatches("DateTextColor",p.dateText);'
      + 'updateSwatches("LitBatteryColor",p.litB);'
      + 'updateSwatches("LitStepsColor",p.litS);'
      + 'updateSwatches("DimBatteryColor",p.dimB);'
      + 'updateSwatches("DimStepsColor",p.dimS);}'

      + 'function h(hex){return parseInt(hex.slice(1),16);}'
      + 'function tog(id){return document.getElementById(id).checked?1:0;}'

      + 'function save(){'
      + 'var s={'
      + 'BackgroundColor:h(colors.BackgroundColor),'
      + 'OverlayBgColor:h(colors.OverlayBgColor),'
      + 'TimeTextColor:h(colors.TimeTextColor),'
      + 'DateTextColor:h(colors.DateTextColor),'
      + 'LitBatteryColor:h(colors.LitBatteryColor),'
      + 'LitStepsColor:h(colors.LitStepsColor),'
      + 'DimBatteryColor:h(colors.DimBatteryColor),'
      + 'DimStepsColor:h(colors.DimStepsColor),'
      + 'InvertBW:tog("InvertBW"),'
      + 'ShowRing:tog("ShowRing"),'
      + 'StepGoal:parseInt(document.getElementById("StepGoal").value)'
      + '};'
      + 'window.location="pebblejs://close#"+encodeURIComponent(JSON.stringify(s));}'

      + 'loadSettings();initSwatches();applyPlatform();'
      + '</script></body></html>';
    return 'data:text/html,' + encodeURIComponent(html);
  }
};
