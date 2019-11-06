importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0b143895b500d8453503.js",
    "revision": "7ece27c1ac71dcc65a9d54f640412846"
  },
  {
    "url": "/_nuxt/167f943bddee723103bb.js",
    "revision": "d80c409d59b849d05b01ce275d2b2f7d"
  },
  {
    "url": "/_nuxt/351e06cd6f2e865429ac.js",
    "revision": "4219321df34f6545d88e2c464fd51305"
  },
  {
    "url": "/_nuxt/3b886e24e88205e4cb20.js",
    "revision": "da0109213434615011cf85098479ef05"
  },
  {
    "url": "/_nuxt/465dcb536ef97caa7fc4.js",
    "revision": "eb0e946a667a173120a400774ec856dc"
  },
  {
    "url": "/_nuxt/5eac11f83d65afd2bbf8.js",
    "revision": "6ed91d89b99635405aed054dc4684c2c"
  },
  {
    "url": "/_nuxt/62dadd77cd087e2d1de5.js",
    "revision": "6ad3406e2e052e6d5c59d6bc81459ac2"
  },
  {
    "url": "/_nuxt/6c1895361534f8b8d7f2.js",
    "revision": "66bc17bde54804f17f40cdda779aaba4"
  },
  {
    "url": "/_nuxt/7b4bd7e325a09808707c.js",
    "revision": "2b1974a014c1cbe6e3ffb40ce9e33a29"
  },
  {
    "url": "/_nuxt/81793461f08b3ad6b5c5.js",
    "revision": "aa2a99d3853352373c5c2b0f1c48c860"
  },
  {
    "url": "/_nuxt/96259fecb4ef2ecec5d4.js",
    "revision": "d375ec300f3390390837c8a8221b928a"
  },
  {
    "url": "/_nuxt/9fe930278ed3a548a791.js",
    "revision": "ff981bf39f9c9b95585897660d6cdbe5"
  },
  {
    "url": "/_nuxt/b74176934ff047ee5b55.js",
    "revision": "712129766700fbab351147b58f7cdb32"
  },
  {
    "url": "/_nuxt/bf93121eb7827d0dc036.js",
    "revision": "96627e422e3a7d9ff2bf31d47c39ec71"
  },
  {
    "url": "/_nuxt/c013dd36b9f16d844fa5.js",
    "revision": "56561dc213e7c77c2bccd5676a746fea"
  },
  {
    "url": "/_nuxt/cbc8281f08b87e3c0b79.js",
    "revision": "d85b144551d174ab75d05f8165a9fa96"
  },
  {
    "url": "/_nuxt/d54f4c52d00047b7e19a.js",
    "revision": "d8c511ced9a6eae15da6ae33c8e1d0c9"
  },
  {
    "url": "/_nuxt/ebf1dda8c5c76dc7d119.js",
    "revision": "ac4a93ffc1a02345fd45ab1cb62d3021"
  },
  {
    "url": "/_nuxt/f64df476a3e013d1d78d.js",
    "revision": "0eba8b3fd060a10f3bc77cb086057b3a"
  },
  {
    "url": "/_nuxt/fb9d26b1111be55e4adf.js",
    "revision": "346677e4de787e0ef52b40ad2893fde4"
  }
], {
  "cacheId": "colombo",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
