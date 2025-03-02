document.addEventListener('DOMContentLoaded', function() {
    // 加密数据 - 这里存放的是已经加密的链接数据
    // 格式: {name: "链接名称", url: "链接地址", icon: "可选的图标类名"}
    const encryptedData = "U2FsdGVkX1/4AioALtdPYvA/WASWqAthEIgBp3MOpNucV7xwsZTI6t8aF2Adxi034XaNFA2xBof3etMiiQGdyDfe15jepExiXHfDTcakNU8zQzU/QzTg4U9ynO6XgI2gPC+X36LPzdKdVThXkPyvobC731NK3Y4KSyCPEIoMqeOWoGuPYo9lURXiC2imfF9iPJorMKyYocUfYemxIo4jO2MXdk+NVUpgA2nfsFBtnWZsfpso8k3gInkJdftUUzwB/VBwZ23T0bNH3dOU8IHPLqY9ZOJXS/F2rN7Ra7RWtqm4eZT+9zuxh/RGMSqwpcHk1SnyzYo9ZAnPjmuYfuP30DIMNpy8jum4dFMhTIN1OcMTV3qHHEn6SHiYd7M9eQUW";

    const passwordInput = document.getElementById('password');
    const decryptBtn = document.getElementById('decrypt-btn');
    const encryptedLinksContainer = document.getElementById('encrypted-links');

    // 解密函数
    function decryptData(encryptedText, password) {
        try {
            // 使用CryptoJS进行AES解密
            const bytes = CryptoJS.AES.decrypt(encryptedText, password);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

            // 尝试解析JSON数据
            if (decryptedText) {
                return JSON.parse(decryptedText);
            }
            return null;
        } catch (error) {
            console.error('解密失败:', error);
            return null;
        }
    }

    // 显示解密后的链接
    function displayLinks(links) {
        // 清空容器
        encryptedLinksContainer.innerHTML = '';

        // 添加成功消息
        const successMsg = document.createElement('div');
        successMsg.className = 'decrypt-success';
        successMsg.textContent = '解密成功！以下是隐藏链接：';
        encryptedLinksContainer.appendChild(successMsg);

        // 添加链接
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.textContent = link.name;
            encryptedLinksContainer.appendChild(linkElement);
        });
    }

    // 显示错误消息
    function displayError() {
        encryptedLinksContainer.innerHTML = '';
        const errorMsg = document.createElement('div');
        errorMsg.className = 'decrypt-error';
        errorMsg.textContent = '密码错误，请重试！';
        encryptedLinksContainer.appendChild(errorMsg);
    }

    // 添加解密按钮点击事件
    decryptBtn.addEventListener('click', function() {
        const password = passwordInput.value.trim();
        if (!password) {
            alert('请输入密码');
            return;
        }

        const decryptedData = decryptData(encryptedData, password);
        if (decryptedData) {
            displayLinks(decryptedData);
        } else {
            displayError();
        }
    });

    // 添加回车键触发解密
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            decryptBtn.click();
        }
    });
});