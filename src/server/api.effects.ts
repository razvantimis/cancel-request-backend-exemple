import { r } from '@marblejs/core';
import { mapTo, delay, tap, takeUntil } from 'rxjs/operators';
import { fromEventPattern, Subject } from 'rxjs';

export const api$ = r.pipe(
    r.matchPath('/long-request'),
    r.matchType('GET'),
    r.useEffect(req$ => {

        const closeSubject = new Subject();

        return req$.pipe(
            tap(req => {
                console.log('start fetching')
                req.on('close', () => {
                    console.log('close');
                    closeSubject.next();
                })
            }),
            delay(5000),
            tap(_ => console.log('2. after doing')),
            mapTo({ body: 'Hello, world!' }),
            takeUntil(closeSubject)
        )
    })
);