const button = document.getElementById("start-fetch-button");
const div = document.getElementById("message");

// Create an instance.
const controller = new AbortController()
const signal = controller.signal

const FechingState = {
    START: 'start',
    INPROGRESS: 'INPROGRESS',
    END: 'end'
}
let fechingState = FechingState.START;
button.addEventListener('click', () => {
    if (fechingState === FechingState.START) {
        fechingState = FechingState.INPROGRESS;

        beginFetching();
        button.innerText = "Cancel"
    } else {
        abortFetching();
    }
})

function beginFetching() {
    console.log('Now fetching');
    var urlToFetch = "http://localhost:1337/long-request";

    fetch(urlToFetch, {
        method: 'get',
        signal: signal,
    })
        .then(function (response) {
            fechingState = FechingState.END;
            console.log(`Fetch complete. (Not aborted)`);
        }).catch(function (err) {
            console.error(` Err: ${err}`);
        });
}


function abortFetching() {
    console.log('Now aborting');
    // Abort.
    controller.abort();
    fechingState = FechingState.END;

}