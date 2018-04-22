import HTMLImageElement from './HTMLImageElement'

export default function() {
    const image = wx.createImage();

    // image.tagName = 'IMG'
    // image.__proto__.__proto__.__proto__ = new HTMLImageElement();

    image.classList = [];
    image.classList.add = function(){};
    image.classList.remove = function(){};

    return image;
};
