# Boardy

**Boardy** is a Javascript library for drawing on web browsers.  
it supports following three features, basically.

1. **Responsive** : boardy keeps clear draw output in responsive environment. if image is handled as bitmap, there must be a limit at variouse resolutions. so we solve this problem using **vector-based canvas state**. 
2. **Persist** : boardy is designed to trigger draw actions (object like json), and paint by inject it. in other words, you can maintain painted states by storing the actions. besides, you can also convert these actions to static svg image.
3. **Fast realtime communication** : we developed this module in consideration of realtime communication beginning. so boardy allows you to share your blackboard handwriting on the internet with minimal payload. (not protocol payload, only painting payload)

<br/>

## How to work

<img src="https://kr.object.ncloudstorage.com/load0ne/dropy/how-to-work.png" width="500" alt="how-to-work">

<br/>

## Realtime application architect

<img src="https://kr.object.ncloudstorage.com/load0ne/dropy/real-time-architect.png" width="500" alt="realtime-app-architect">

<br/>

## Cross Browsing

- `last 2 version`
- `> 1%`
- `IE 10`
