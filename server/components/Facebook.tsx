
const FacebookShare = () => {

    return (
        <iframe
        src={`https://www.facebook.com/plugins/share_button.php?href=${encodeURI(window.location.href)}&layout=button_count&size=large&width=110&height=28&appId`}
        width="110"
        height="28"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    )
}

export default FacebookShare;