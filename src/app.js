const router = window.gibon({
  '/': (state) => console.log('home'),
  '/features': (state) => console.log('feature')
});

router.start();