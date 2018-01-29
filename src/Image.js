import HTMLImageElement from 'HTMLImageElement.js'

export default function() {
    var image = wx.createImage();
    console.log(image.onload);
    image.__proto__.__proto__.__proto__ = new HTMLImageElement();
    console.log(image.onload);
    return image;
};
