
   function appendChildToElement(element, content) {
        if (content instanceof Node) {
            element.appendChild(content);
        } else if (content.jquery) {
            element.appendChild(content[0]);
        } else {
            element.innerHTML = content;
        }
    }

    function copyFormValues(source, target) {
        const formElements = target.querySelectorAll('select, textarea');
        formElements.forEach((elem, index) => {
            const sourceElem = source.querySelectorAll('select, textarea')[index];
            if (sourceElem) {
                elem.value = sourceElem.value;
            }
        });
    }

   function printThis(options) {
        const defaults = {
            debug: false,
            importCSS: true,
            importStyle: true,
            printContainer: true,
            loadCSS: "",
            pageTitle: "",
            removeInline: false,
            printDelay: 333,
            header: null,
            footer: null,
            formValues: true,
            canvas: false,
            base: false,
            doctypeString: "<!DOCTYPE html>",
            removeScripts: false,
            copyTagClasses: false
        };

        const settings = Object.assign({}, defaults, options);

        const element = this instanceof HTMLElement ? this : document.querySelector(this);
        const iframeId = "printThis-" + new Date().getTime();
        let iframe;

        if (window.location.hostname !== document.domain && /msie/i.test(navigator.userAgent)) {
            const scriptSrc = `javascript:document.write("<head><script>document.domain=\\"${document.domain}\\";</script></head><body></body>")`;
            iframe = document.createElement("iframe");
            iframe.name = "printIframe";
            iframe.id = iframeId;
            iframe.className = "MSIE";
            document.body.appendChild(iframe);
            iframe.src = scriptSrc;
        } else {
            iframe = document.createElement("iframe");
            iframe.id = iframeId;
            iframe.name = "printIframe";
            document.body.appendChild(iframe);
        }

        const iframeDocument = iframe.contentWindow.document;

        if (!settings.debug) {
            iframe.style.position = "absolute";
            iframe.style.width = "0px";
            iframe.style.height = "0px";
            iframe.style.left = "-600px";
            iframe.style.top = "-600px";
        }

        setTimeout(function () {
            const head = iframeDocument.head;
            const body = iframeDocument.body;

            function appendToHead(content) {
                if (settings.base === true) {
                    const baseTag = document.querySelector("base");
                    const href = baseTag ? baseTag.getAttribute("href") : window.location.origin;
                    const baseElement = document.createElement("base");
                    baseElement.setAttribute("href", href);
                    head.appendChild(baseElement);
                }
                if (settings.importCSS) {
                    const links = document.querySelectorAll("link[rel='stylesheet']");
                    links.forEach(link => {
                        const newLink = document.createElement("link");
                        newLink.rel = "stylesheet";
                        newLink.href = link.href;
                        newLink.media = link.media || "all";
                        head.appendChild(newLink);
                    });
                }
                if (settings.importStyle) {
                    const styles = document.querySelectorAll("style");
                    styles.forEach(style => {
                        const newStyle = document.createElement("style");
                        newStyle.innerHTML = style.innerHTML;
                        head.appendChild(newStyle);
                    });
                }
                if (settings.pageTitle) {
                    const titleTag = document.createElement("title");
                    titleTag.innerText = settings.pageTitle;
                    head.appendChild(titleTag);
                }
            }

            appendToHead();

            if (settings.copyTagClasses) {
                if (settings.copyTagClasses === true || settings.copyTagClasses.includes("b")) {
                    body.className = document.body.className;
                }
                if (settings.copyTagClasses === true || settings.copyTagClasses.includes("h")) {
                    iframeDocument.documentElement.className = document.documentElement.className;
                }
            }

            if (settings.header) {
                appendChildToElement(body, settings.header);
            }

            if (settings.canvas) {
                const canvasElements = element.querySelectorAll("canvas");
                canvasElements.forEach((canvas, index) => {
                    canvas.setAttribute("data-printthis", index);
                });
            }

            if (settings.formValues) {
                copyFormValues(element, body);
            }

            if (settings.canvas) {
                const canvases = body.querySelectorAll("canvas");
                canvases.forEach(canvas => {
                    const printCanvas = element.querySelector(`[data-printthis="${canvas.getAttribute('data-printthis')}"]`);
                    canvas.getContext("2d").drawImage(printCanvas, 0, 0);
                    printCanvas.removeAttribute("data-printthis");
                });
            }

            if (settings.removeInline) {
                const allElements = body.querySelectorAll("*");
                allElements.forEach(elem => {
                    elem.removeAttribute("style");
                });
            }

            if (settings.footer) {
                appendChildToElement(body, settings.footer);
            }

            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
                if (!settings.debug) {
                    setTimeout(function () {
                        iframe.remove();
                    }, 1000);
                }
            }, settings.printDelay);
        }, 333);
    }

    HTMLElement.prototype.printThis = printThis;
