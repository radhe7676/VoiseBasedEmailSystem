const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <p>${survey.body}</p>
        </div>
      </body>
    </html>
  `;
};
