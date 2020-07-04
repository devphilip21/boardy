# Boardy

**Boardy** is a Javascript library for drawing on web browsers.  
it supports following three features, basically.

1. **Responsive** : boardy keeps clear draw output in responsive environment. if context is handled by bitmap, there is a limit at variouse resolutions. so we solve this problem using **vector-based canvas state**. 
2. **Persist** : boardy is designed to be able to export context as **object like json**, and you can repaint by importing this context object. we considered this context object to be used for real-time network, so optimize context object size.
3. **Reactive** : boardy supports [flux architecture](https://facebook.github.io/flux/). context is managed by `Boardy.Store`.

## Cross Browsing

- `last 2 version`
- `> 1%`
- `IE 10`
