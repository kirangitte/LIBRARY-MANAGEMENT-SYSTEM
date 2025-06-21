```javascript
const express = require('express');
const router = express.Router();

// ...existing routes...

router.get('/viewProfile', (req, res) => {
    if (req.session && req.session.user) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// ...existing routes...

module.exports = router;
```