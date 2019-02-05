function createResizeHandler(tabSection) {
    const drp = tabSection.querySelector('.av-tab-section-dropdown-container');
    const tabs = tabSection.querySelector('.av-tab-section-tab-title-container');
    const alwaysDropdown = tabSection.classList.contains('dropdown-on-desktop');
    function setDropdown() {
        drp.style.display = 'block';
        tabs.style.display = 'none';
    }

    function setTabs() {
        drp.style.display = 'none';
        tabs.style.display = 'block';
    }

    return function () {
        if (alwaysDropdown || window.matchMedia('(max-width: 768px)').matches) {
            setDropdown();
        } else {
            setTabs();
        }
    }
}

function addResizeListeners(tabSection) {
    const resizeHandler = createResizeHandler(tabSection);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
}

function addDropdownListeners(tabSection) {
    const select = tabSection.querySelector('.av-tab-section-dropdown-container select');
    select.addEventListener('change', function (event) {
        const [value] = event.target.value;
        const query = '.av-section-tab-title[data-av-tab-section-title="' + value + '"]';
        const targetTab = tabSection.querySelector(query);
        targetTab.click();
    })
}

function addTabsListeners(tabSection) {
    const tabs = tabSection.querySelectorAll('.av-section-tab-title');
    function addTabListener(tab) {
        const select = tabSection.querySelector('.av-tab-section-dropdown-container select');
        const value = tab.dataset.avTabSectionTitle;
        const query = 'option[value="' + value + '"]';
        const targetOption = select.querySelector(query);
        const foundIndex = Array.prototype.indexOf.call(select.childNodes, targetOption);
        if (foundIndex < 0) throw Error('not found target option');
        const observer = new MutationObserver(function () {
            if (tab.classList.contains('av-active-tab-title')) {
                select.selectedIndex = foundIndex;
            }
        });
        observer.observe(tab, { attributes: true });
    }
    Array.prototype.forEach.call(tabs, addTabListener);
}

function attachDropdown(tabSection) {
    const drp = document.createElement('div');
    drp.classList.add('av-tab-section-dropdown-container');

    function attachOption(tab) {
        const option = document.createElement('option');
        option.value = tab.dataset.avTabSectionTitle;
        option.innerHTML = tab.querySelector('.av-inner-tab-title').innerText;
        if (tab.classList.contains('av-active-tab-title')) {
            option.setAttribute('selected', 'selected');
        }
        select.appendChild(option);
    }
    const tabs = tabSection.querySelectorAll('.av-section-tab-title');
    const select = document.createElement('select');
    Array.prototype.forEach.call(tabs, attachOption);
    drp.appendChild(select);

    const outerCont = tabSection.querySelector('.av-tab-section-outer-container');
    const innerCont = outerCont.querySelector('.av-tab-section-inner-container');
    outerCont.insertBefore(drp, innerCont);
}

/* This script transorms .av-tab-section tabs into dropdown selector */
/* add .dropdown-on-mobile or dropdown-on-desktop class to enable this behavior */
document.addEventListener('DOMContentLoaded', function () {
    var tabSection = document.querySelectorAll('.dropdown-on-mobile, .dropdown-on-desktop');
    Array.prototype.forEach.call(tabSection, attachDropdown);
    Array.prototype.forEach.call(tabSection, addDropdownListeners);
    Array.prototype.forEach.call(tabSection, addTabsListeners);
    Array.prototype.forEach.call(tabSection, addResizeListeners);
});
