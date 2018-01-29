import HTMLImageElement from './HTMLImageElement'

export default function() {
    const image = wx.createImage();

console.log(HTMLImageElement)
    image.__proto__.__proto__.__proto__ = new HTMLImageElement();

    return image;
};
