try {
  const mongoSanitize = require('express-mongo-sanitize');
  const hpp = require('hpp');
  console.log('Modules loaded successfully');
} catch (e) {
  console.error('Module load failed:', e.message);
}
