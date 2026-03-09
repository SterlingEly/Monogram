// Monogram config page — placeholder until settings UI is designed
// Minimal stub: returns an empty data URL so the app doesn't crash on config open
module.exports = {
  buildUrl: function(platform, savedSettings) {
    // TODO: build a real settings page once design is finalized
    var html = '<!DOCTYPE html><html><body style="background:#000;color:#fff;font-family:sans-serif;padding:20px">' +
      '<h2>Monogram</h2><p>Settings coming soon.</p>' +
      '<button onclick="window.location=\'pebblejs://close#\'+encodeURIComponent(JSON.stringify({}))">Close</button>' +
      '</body></html>';
    return 'data:text/html,' + encodeURIComponent(html);
  }
};
