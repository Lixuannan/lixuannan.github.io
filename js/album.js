window.onload = () => {
  let imgInfo = null;
  const renderDOM = document.querySelector('.photo-album');
  let prevMode = 1;

  const getInnerHTML = (item) => {
    return `
  <div class="photo-container">
    <div class="show">
      <div class="hover-show">
        <div class="svg-container copyright">
          <i class="svg iconfont icon-copyright" style="font-size: 21px;"></i>
          <div class="copyright-hover-show">
            <p>授权类型：${item.copyright}</p>
          </div>
          <div class="copyright-hover-arrow">
            <div class="arrow"></div>
          </div>
        </div>
        <div class="svg-container download">
          <svg class="svg" t="1673083589533" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2098" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
            <path d="M952.8 668.48a40.16 40.16 0 0 0-39.2 39.2c0 86.24-57.6 156.96-130.88 156.96H241.28C168 864 110.4 793.92 110.4 707.68a40.16 40.16 0 0 0-39.2-39.2A40.16 40.16 0 0 0 32 707.68c0 130.72 94.24 235.36 209.28 235.36h541.44C897.76 943.04 992 838.4 992 707.68a40.16 40.16 0 0 0-39.2-39.2z" fill="#3c4858" p-id="2099"></path>
            <path d="M484.48 686.72a45.12 45.12 0 0 0 57.6 0l149.12-149.12a38.88 38.88 0 0 0-54.88-54.88l-81.12 81.12V119.04a39.36 39.36 0 0 0-78.56 0v444.8l-81.12-81.12a38.88 38.88 0 0 0-54.88 54.88z" fill="#3c4858" p-id="2100"></path>
          </svg>
        </div>
        <div class="mask"></div>
      </div>
        <img class="scenery" src="${item.imgSrc}" alt="${item.descreption}">
      </a>
    </div>
  </div>
  `;
  };

  const reduceDOM = (limit) => {
    const htmlString = Array.from(Array(limit), () => '<div class="photo-list">');
    imgInfo.forEach((item, index) => {
      const surplus = index % limit;
      htmlString[surplus] += getInnerHTML(item);
    });
    for (let i = 0; i < limit; i++) {
      htmlString[i] += '</div>';
    }
    renderDOM.innerHTML = htmlString.join('');

    const downloads = document.querySelectorAll('.download');
    downloads.forEach((download, index) => {
      download.onclick = () => {
        const copyright =
          document.querySelectorAll('.copyright')[index];
        const confirmMsg = "请认真阅读以下协议内容：\n\n本张图片" + (copyright ? copyright.textContent.trim() : "类型未知") + "\n\n如果图片授权类型为 free，那么您可以随意使用该图片，使用方法包括但不限于桌面壁纸、商用、非商用等。\n\n值得提醒的是，在您使用图片时，建议您在使用图片时附上摄影师的名字（CodingCow Lee）。\n\n如果图片的授权类型为 paid，您需要对商业使用的行为进行付费，具体定价请咨询站长（邮箱：leecodingcow@gmail.com；微信：LeeCodingCow，添加微信请注明来源）\n\n如果是个人的非商业使用，建议您在使用图片时附上摄影师的名字（CodingCow Lee）。\n\n点击下载意味着您知晓并承诺遵守以上内容，确认下载吗？";
        if (!window.confirm(confirmMsg)) {
          return;
        }
        const req = new XMLHttpRequest();
        const img = document.querySelectorAll('.scenery')[index];
        req.open('GET', img.src, true);
        req.responseType = 'blob';
        req.onload = () => {
          const url = window.URL.createObjectURL(req.response);
          const a = document.createElement('a');
          a.href = url;
          a.download = '';
          a.click();
        };
        req.send();
      };
    });
  };

  const resize = () => {
    if (!imgInfo) return;
    const width = window.innerWidth;
    if (width >= 1000 && prevMode !== 3) {
      prevMode = 3;
      reduceDOM(prevMode);
    } else if (width < 1000 && prevMode !== 2) {
      prevMode = 2;
      reduceDOM(prevMode);
    }
  };

  $.getJSON('/album.json', function (data) {
    imgInfo = data;
    resize();
  });

  window.onresize = () => {
    resize();
  };
};