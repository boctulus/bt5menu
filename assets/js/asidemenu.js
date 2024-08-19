class AsideMenu {
    constructor(menuItems, menuConfig) {
        this.menuItems = menuItems;
        this.menuConfig = menuConfig;
        this.sidebar = document.getElementById('sidebar');
        this.content = document.getElementById('content');
        this.sidebarCollapse = document.getElementById('sidebarCollapse');
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderMenu();
            this.handleEvents();
            this.handleResize();

            // Inicializar el estado del sidebar según menuConfig.starts_expanded
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

        this.sidebar.innerHTML = `
            <div id="list-wrapper">
                <div role="list" class="v-list" background-color: rgb(0, 0, 0); color: rgb(184, 199, 206);">
                    ${this.generateSidebarLinks(this.menuItems[this.menuConfig.role])}
                </div>
            </div>`;
    }

    generateSidebarLinks(menuItems, level = 0) {
        let sidebarHTML = `<ul class="list-unstyled${level > 0 ? ' treeview-menu' : ''}">`;
    
        menuItems.forEach((option) => {
            const hasChilds = option.childs && option.childs.length > 0;
            const id = `menu-${option.text.replace(/\s+/g, '-').toLowerCase()}`;
    
            // Generar string de atributos adicionales
            let additionalAtts = '';
            if (option.atts) {
                for (const [key, value] of Object.entries(option.atts)) {
                    if (key === 'click') {
                        if (!hasChilds){
                            additionalAtts += ` onclick="${value}"`;  
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
                let extra = '';
                
                if (option.secondary_icon){
                    extra = option.secondary_icon;
                } else if (option.counter){
                    extra = `<span class="counter">${option.counter}</span>`;
                }

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
                            ${hasChilds ? 'onclick="this.closest(\'#sidebar\').classList.add(\'expanded\')"' : ''}
                            >
                            <i aria-hidden="true" class="v-icon" data-feather="${option.icon}"></i>
                            <span class="item_node engravers">${option.text}</span>
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
        });
    
        sidebarHTML += '</ul>';
        return sidebarHTML;
    }

    toggleSidebar() {
        const isMobileView = window.innerWidth < 992;
        const sidebarExpanded = this.sidebar.classList.contains('expanded');
    
        // Alternar expansión del sidebar
        this.sidebar.classList.toggle('expanded');
        this.sidebarCollapse.setAttribute('aria-expanded', sidebarExpanded);
    
        if (sidebarExpanded) {
            this.collapseAllItems();
        }
    
        // Controlar desplazamiento del contenido solo en pantallas grandes
        if (!isMobileView) {
            this.content.classList.toggle('shifted', this.sidebar.classList.contains('expanded'));
        }
    }    

    handleEvents() {
        this.sidebarCollapse.addEventListener('click', () => this.toggleSidebar());
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        const isMobileView = window.innerWidth < 992;
    
        if (isMobileView) {
            this.content.classList.remove('shifted');
            if (this.sidebar.classList.contains('expanded')) {
                this.sidebar.classList.remove('expanded');
                this.sidebarCollapse.setAttribute('aria-expanded', 'false');
                this.collapseAllItems();
            }
        } else if (!this.sidebar.classList.contains('expanded')) {
            this.sidebar.classList.add('collapsed');
        }
    }   

    collapseAllItems() {
        const collapseElements = this.sidebar.querySelectorAll('.collapse');
        collapseElements.forEach(el => el.classList.remove('show'));
    }

    expandAllItems(){
        const collapseElements = this.sidebar.querySelectorAll('.collapse');
        collapseElements.forEach(el => el.classList.add('show'));
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
