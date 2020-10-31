import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Home', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Home => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%'

        })
      ]),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%' }))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),  transition('Home => MisTurnos', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
      ),
      group([
        query(':enter', [
          style({ transform: 'scale(2)' }),
          animate('0.5s',
            style({ transform: 'scale(1.5)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'scale(2)' }))
        ], { optional: true }),
      ])
    ]),
    transition('MisTurnos => Home', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(100%)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateY(-100%)' }))
        ], { optional: true }),
      ])
    ]),

  ]);


export const myAnimation =
  trigger('routeAnimations', [
    transition('Home => MisTurnos', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
      ),
      group([
        query(':enter', [
          style({ transform: 'scale(2)' }),
          animate('0.5s',
            style({ transform: 'scale(1.5)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'scale(2)' }))
        ], { optional: true }),
      ])
    ]),
    transition('MisTurnos => Home', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(100%)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateY(-100%)' }))
        ], { optional: true }),
      ])
    ]),

  ]);

  
export const slideInAnimation2 =
trigger('routeAnimations', [
  transition('Login => Home', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1000ms ease-out', style({ left: '100%' }))
      ]),
      query(':enter', [
        animate('1000ms ease-out', style({ left: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ]),
  transition('Home => Login', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%'

      })
    ]),
    query(':enter', [
      style({ right: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('1000ms ease-out', style({ right: '100%' }))
      ]),
      query(':enter', [
        animate('1000ms ease-out', style({ right: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ])
]);
