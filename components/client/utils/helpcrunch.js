const helpCrunchInit = (w, d) => {
    w.HelpCrunch= function() {
        w.HelpCrunch.q.push(arguments)
    }
    w.HelpCrunch.q = []
        const s = w.document.createElement('script');
        s.async = 1;
        s.type = 'text/javascript';
        s.src = 'https://widget.helpcrunch.com/';
        (d.body || d.head).appendChild(s);

    // w.addEventListener('load', r, false)
}
export const helpCrunchStart = () => {
    helpCrunchInit(window, window.document);
    window.HelpCrunch('init', 'twinsann', {
        applicationId: 2,
        applicationSecret: 'EnOX5SIMaX/UMsYydR4vnjjkGesH1LUAO+vnReTkcrz8PcdUgnYsLAyBOGdBHLdMQSfXo1U5OgJaue5isGzPww=='
    })
    window.HelpCrunch('showChatWidget');
}