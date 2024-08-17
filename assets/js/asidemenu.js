/*
    By boctulus
*/

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

            // Inicializar el estado del sidebar según menuConfig.menu_starts_expanded
            if (this.menuConfig.menu_starts_expanded) {
                this.toggleSidebar();
            }

            // Feather icons
            feather.replace();
        });
    }

    renderMenu() {
        this.sidebar.innerHTML = `
            <div style="margin-top: 5em;">
                <div role="list" class="v-list" style="margin-top: 3em; background-color: rgb(0, 0, 0); color: rgb(184, 199, 206);">
                    ${this.generateSidebarLinks(this.menuItems[this.menuConfig.role])}
                </div>
            </div>`;
    }

    generateSidebarLinks(menuItems, level = 0) {
        let sidebarHTML = `<ul class="list-unstyled${level > 0 ? ' treeview-menu' : ''}">`;

        menuItems.forEach((link) => {
            const hasChilds = link.childs && link.childs.length > 0;
            const id = `menu-${link.text.replace(/\s+/g, '-').toLowerCase()}`;

            if (level === 0 && link.link && !hasChilds) {
                sidebarHTML += `
                    <li>
                        <a href="${link.link}" class="item leaf link">
                            <i aria-hidden="true" class="v-icon" data-feather="${link.icon}"></i>
                            <span class="item_node engravers">${link.text}</span>
                        </a>
                    </li>`;
            } else {
                sidebarHTML += `
                    <li>
                        <div class="item${hasChilds ? '' : ' leaf'}${link.link ? ' link' : ''}" ${hasChilds ? `data-bs-toggle="collapse" data-bs-target="#${id}"` : ''} ${link.link ? `onclick="window.location.href='${link.link}'"` : ''}>
                            <i aria-hidden="true" class="v-icon" data-feather="${link.icon}"></i>
                            <span class="item_node engravers">${link.text}</span>
                            ${hasChilds ? '<i class="angle-right" data-feather="chevron-right"></i><i class="angle-down" data-feather="chevron-down"></i>' : ''}
                        </div>`;

                if (hasChilds) {
                    sidebarHTML += `
                        <div class="collapse" id="${id}">
                            ${this.generateSidebarLinks(link.childs, level + 1)}
                        </div>`;
                }

                sidebarHTML += '</li>';
            }

            if (link.separator !== undefined && link.separator) {
                if (level === 0) {
                    sidebarHTML += '<li role="presentation"><hr role="separator" aria-orientation="horizontal" class="dropdown-divider"></li>';
                }
            }
        });

        sidebarHTML += '</ul>';
        return sidebarHTML;
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('expanded');
        this.sidebarCollapse.setAttribute('aria-expanded', this.sidebar.classList.contains('expanded'));

        if (window.innerWidth >= 992) {
            this.content.classList.toggle('shifted');
        }

        feather.replace();
    }


    handleEvents() {
        this.sidebarCollapse.addEventListener('click', () => this.toggleSidebar());
        window.addEventListener('resize', () => this.handleResize());
    }

    handleResize() {
        if (window.innerWidth < 992) {
            this.content.classList.remove('shifted');
            if (this.sidebar.classList.contains('expanded')) {
                this.sidebar.classList.remove('expanded');
                this.sidebarCollapse.setAttribute('aria-expanded', 'false');
            }
        }
    }
}