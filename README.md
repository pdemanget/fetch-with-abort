Fetch with abort
================

Allow to use xhr.abort functionnality with fetch API.

We use the cancellable blueBird promise in order to allow that

It shims totally the real fetch since we can't add abort to the fetch of the browser.


Usage
-----

    import fetch from 'fetch-with-abort'

    fetch('example.com').then(response=>response.text()).then(text=>console.log('received '+text)); 
