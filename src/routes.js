import gibon from 'gibon';

const router = gibon({

  '/': (state) => console.log('home'),

  '/features': (state) => console.log('about')

});

export default router;