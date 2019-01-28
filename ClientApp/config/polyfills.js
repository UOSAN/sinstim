if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
        setTimeout(callback, 0);
    };
}
