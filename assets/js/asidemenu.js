class AsideMenu {
    constructor(menuItems, menuConfig) {
        this.menuItems = menuItems;
        this.menuConfig = menuConfig;
        this.asidemenu = document.getElementById('asidemenu');
        this.content = document.getElementById('content');
        this.sidebar = document.getElementById('sidebar');
        this.onExpandCallback = null;
        this.onCollapseCallback = null;
    }

    setOnExpandHandler(callback) {
        if (typeof callback === 'function') {
            this.onExpandCallback = callback;
        } else {
            console.error('The argument must be a valid callback');
        }
    }

    setOnCollapseHandler(callback) {
        if (typeof callback === 'function') {
            this.onCollapseCallback = callback;
        } else {
            console.error('The argument must be a valid callback');
        }
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderMenu();
            this.handleEvents();
            this.handleResize();

            // Inicializar el estado del asidemenu según menuConfig.starts_expanded
            if (this.menuConfig.starts_expanded) {
                this.toggleSidebar();

                if (this.menuConfig.options_starts_expanded) {
                    this.expandAllItems();
                }
            }            
        });
    }

    renderMenu() {
        const margin_top = this.menuConfig.margin_top != 'undefined' ?  this.menuConfig.margin_top : "0px";

        this.asidemenu.innerHTML = `
        <div id="list-wrapper">
            <div role="list" class="v-list">
                ${this.generateSidebarLinks(this.menuItems[this.menuConfig.role])}
            </div>
        </div>`;

        // Inicializar los íconos de Feather después de renderizar el menú
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }

    generateSidebarLinks(menuItems, level = 0) {
        let sidebarHTML = `<ul class="list-unstyled${level > 0 ? ' treeview-menu' : ''}">`;
    
        menuItems.forEach((option) => {
            if (option.html || option.html_compact) {  
                if (option.html && option.html_compact) {
                    // Si tiene ambas versiones, usamos la lógica original
                    sidebarHTML += `<li class="custom-html-container">
                        <div class="expanded-html">${option.html}</div>
                        <div class="compact-html">${option.html_compact}</div>
                    </li>`;
                } else if (option.html) {
                    // Si solo tiene html, lo mostramos siempre
                    sidebarHTML += `<li class="custom-html-container always-visible">
                        ${option.html}
                    </li>`;
                }
            } else {

                const hasChilds = option.childs && option.childs.length > 0;
                const id = `menu-${option.text.replace(/\s+/g, '-').toLowerCase()}`;
        
                // Generar string de atributos adicionales
                let additionalAtts = '';
                let clickEvent = '';
                if (option.atts) {
                    for (const [key, value] of Object.entries(option.atts)) {
                        if (key === 'click') {
                            if (!hasChilds) {
                                clickEvent = value;
                            }
                        } else {
                            additionalAtts += ` ${key}="${value}"`;
                        }
                    }
                }
        
                let extra = '';
                if (option.secondary_icon) {
                    extra = option.secondary_icon;
                } else if (option.counter) {
                    extra = `<span class="counter">${option.counter}</span>`;
                }
        
                // Si no hay un onclick personalizado y hay un link, usamos el comportamiento por defecto
                if (!option.atts || !option.atts.click) {
                    additionalAtts = option.link ? `onclick="window.location.href='${option.link}'"` : '';
                }
                
                // console.log('Extra', extra);

                if (level === 0 && option.link && !hasChilds) {
                    sidebarHTML += `
                        <li>
                            <a href="${option.link}" class="item leaf link">
                                <i aria-hidden="true" class="v-icon" data-feather="${option.icon}"></i>
                                <span class="item_node engravers">${option.text}</span>
                                ${extra}
                            </a>`;
                } else {
                    sidebarHTML += `
                    <li>
                        <div class="item${hasChilds ? '' : ' leaf'}${option.link ? ' link' : ''}" 
                            ${hasChilds ? `data-bs-toggle="collapse" data-bs-target="#${id}"` : ''} 
                            ${additionalAtts}
                            ${hasChilds ? `onclick="menu.expandSidebar()"` : ''}
                        >
                            ${!hasChilds && clickEvent ? `<span class="clickable-area" onclick="${clickEvent}">` : ''}
                            <i aria-hidden="true" class="v-icon" data-feather="${option.icon}"></i>
                            <span class="item_node engravers">${option.text}</span>
                            ${!hasChilds && clickEvent ? `</span>` : ''}
                            ${hasChilds ? 
                                '<i class="angle-right" data-feather="chevron-right"></i><i class="angle-down" data-feather="chevron-down"></i>' : 
                                extra}
                        </div>`;
                }
        
                if (hasChilds) {
                    sidebarHTML += `
                        <div class="collapse" id="${id}">
                            ${this.generateSidebarLinks(option.childs, level + 1)}
                        </div>`;
                }
        
                sidebarHTML += '</li>';
        
                if (option.separator !== undefined && option.separator) {
                    if (level === 0) {
                        sidebarHTML += '<li role="presentation"><hr role="separator" aria-orientation="horizontal" class="dropdown-divider"></li>';
                    }
                }
            }
        });
    
        sidebarHTML += '</ul>';
        return sidebarHTML;
    }

    toggleSidebar() {
        const isMobileView = window.innerWidth < 992;
        const wasExpanded = this.asidemenu.classList.contains('expanded');
    
        if (wasExpanded) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
    
        // Controlar desplazamiento del contenido solo en pantallas grandes
        if (!isMobileView) {
            this.content.classList.toggle('shifted', this.asidemenu.classList.contains('expanded'));
        }

        this.updateCustomHtmlVisibility();
    }

    handleEvents() {
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        const isMobileView = window.innerWidth < 992;
        
        if (isMobileView) {
            this.content.classList.remove('shifted');
            if (this.asidemenu.classList.contains('expanded')) {
                this.collapseSidebar();
            }
            this.toggleContentScroll(false); // Asegúrr de habilitar el scroll en vista móvil

        } else if (!this.asidemenu.classList.contains('expanded')) {
            this.asidemenu.classList.add('collapsed');
            this.sidebar.classList.remove('expanded');
        }

        this.updateCustomHtmlVisibility();
    }

    updateCustomHtmlVisibility() {
        const isExpanded = this.sidebar.classList.contains('expanded');
        const customHtmlContainers = document.querySelectorAll('.custom-html-container');
        
        customHtmlContainers.forEach(container => {
            const expandedHtml = container.querySelector('.expanded-html');
            const compactHtml  = container.querySelector('.compact-html');

            if (expandedHtml) expandedHtml.style.display = isExpanded ? 'block' : 'none';
            if (compactHtml) compactHtml.style.display = isExpanded ? 'none' : 'block';
        });
    }

    toggleContentScroll(disable) {
        const content = document.body;
        if (disable) {
            // Guarda la posición actual del scroll
            this.scrollPosition = window.scrollY;
            content.style.overflow = 'hidden';
            content.style.position = 'fixed';
            content.style.top = `-${this.scrollPosition}px`;
            content.style.width = '100%';
        } else {
            // Restaura el scroll
            content.style.removeProperty('overflow');
            content.style.removeProperty('position');
            content.style.removeProperty('top');
            content.style.removeProperty('width');
            window.scrollTo(0, this.scrollPosition);
        }
    }

    expandSidebar() {
        if (!this.asidemenu.classList.contains('expanded')) {
            this.asidemenu.classList.add('expanded');
            this.sidebar.classList.add('expanded');
            this.toggleContentScroll(true); // Deshabilita el scroll

            if (this.onExpandCallback) {
                this.onExpandCallback();
            }
        }
        this.updateCustomHtmlVisibility();
    }

    collapseSidebar() {
        if (this.asidemenu.classList.contains('expanded')) {
            this.asidemenu.classList.remove('expanded');
            this.sidebar.classList.remove('expanded');
            this.collapseAllItems();
            this.toggleContentScroll(false); // Habilita el scroll
            
            if (this.onCollapseCallback) {
                this.onCollapseCallback();
            }
        }
        this.updateCustomHtmlVisibility();
    }

    expandAllItems(){
        const collapseElements = this.asidemenu.querySelectorAll('.collapse');
        collapseElements.forEach(el => el.classList.add('show'));
    }

    collapseAllItems() {
        const collapseElements = this.asidemenu.querySelectorAll('.collapse');
        collapseElements.forEach(el => el.classList.remove('show'));
    }

    setCounter(val){
        if (Number.isInteger(val)){
            if (val>99){
                val = 99;
            }

            val = '' + val;
        }
        
        document.querySelector('.counter').innerHTML = val
    }
}
