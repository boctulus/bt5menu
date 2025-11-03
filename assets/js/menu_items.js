const menu_items = {
    admin:  [
        {
          html: `
          <div class="logo-container">
            <div class="mobile-menu-header">
              <div class="mobile-logo">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Logo simple hexagonal -->
                  <path d="M40 8L68 24V56L40 72L12 56V24L40 8Z" stroke="white" stroke-width="3" fill="rgba(255, 255, 255, 0.15)"/>
                  <circle cx="40" cy="40" r="15" fill="white"/>
                  <circle cx="40" cy="40" r="8" fill="rgba(139, 127, 216, 0.8)"/>
                </svg>
                <span class="mobile-company-name">COMPANYNAME</span>
              </div>
            </div>
            <div class="desktop-logo">
              <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 8L68 24V56L40 72L12 56V24L40 8Z" stroke="white" stroke-width="3" fill="rgba(255, 255, 255, 0.15)"/>
                <circle cx="40" cy="40" r="15" fill="white"/>
                <circle cx="40" cy="40" r="8" fill="rgba(139, 127, 216, 0.8)"/>
              </svg>
            </div>
          </div>
          `
        },
        {
          html: `
          <!-- Profile card -->
          <div class="profile">
            <div class="image-container">
              <img src="assets/img/avatar.png" alt="Profile picture" class="profile-image">
              <span class="edit-icon">
                <i data-feather="edit-2"></i>
              </span>
            </div>
            <div class="profile-content">
              <span class="name">Pablo Bozzolo</span>
              <button class="sign-out-btn" onclick="logout()" title="Sign out" aria-label="Sign out">
                <i data-feather="log-out"></i>
              </button>
            </div>
          </div>
          `
        },
        {
          html: `
          <!-- Toggle sidebar button -->
          <div class="toggle-wrapper">
            <button class="toggle-btn" onclick="event.stopPropagation(); menu.toggleSidebar()" title="Toggle menu" aria-label="Toggle menu">
              <i data-feather="chevrons-right"></i>
            </button>
          </div>
          `
        },
        { 
          text: "Exam list", 
          link: "/dashboard/exam-list", 
          icon: "heart", 
          counter: 99, 
          /* secondary_icon: "<span class='counter'>0</span>" */
          /* "separator": true */ 
        },
        { text: "Fast reporting", link: "/dashboard/fast-reporting", icon: "zap" },
        { text: "Patients", link: "/dashboard/patients", icon: "users" },
        { text: "Administration",
          childs: [ 
            { text: "Roles", 
              childs: [
                { text: "Users", link: "/dashboard/administration/roles/users", icon: "user" }
              ],
              icon: "shield"
            },
            { text: "Sites", link: "/dashboard/administration/sites", icon: "map-pin" },
            { text: "Groups", link: "/dashboard/administration/groups", icon: "layers" },
            { text: "Devices", link: "/dashboard/administration/devices", icon: "cpu" }
          ],
          icon: "settings"
        },
        { text: "Settings",  
          childs: [ 
            { text: "Item 1", link: "/dashboard/settings/item1", icon: "sliders" }, 
            { text: "Item 2", link: "/dashboard/settings/item2", icon: "sliders" }, 
            { text: "Item 3", link: "/dashboard/settings/item3", icon: "sliders" }
          ],
          icon: "sliders"
        },
        { text: "Integration Layer",  
          childs: [ 
            { 
              text: "Item 1", 
              icon: "layers",
              atts: {
                "id": "my_id",
                "click": "my_callback(this);"
              }
             }
          ],
          icon: "layers"
        },
        { text: "System",  
          childs: [ 
            { text: "Item 1", link: "/dashboard/system/item1", icon: "server" }, 
            { text: "Item 2", link: "/dashboard/system/item2", icon: "server" }
          ],
          icon: "cpu"
        },
        { text: "Info", link: "javascript:alert('System is operational')", icon: "info" }
    ],

    // Other user-role's objects for rendering. E.g.
    manager: [
      {},
      {},
      {},
    ]
};       