const menu_items = { 
    admin:  [
        {
          html: `
          <span class="logo logo-wide">LOGO</span> 
          `,
          html_compact: `
          <span class="logo logo-thin">L</span>
          `
        },
        { text: "Sign out", 
          atts: {
            "id": "sign_out",
            "click": "logout()"
          },
          icon: "log-out",
          secondary_icon: "<span onclick=\"event.stopPropagation(); menu.toggleSidebar()\" data-feather='chevrons-right' style='position: absolute; right: 8px;'></span>"
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
            <span class="name">Pablo Bozzolo</span>
          </div>
          `,
          html_compact: `
          <!-- Profile card -->
          <div class="profile">
            <div class="image-container">
              <img src="assets/img/avatar.png" alt="Profile picture" class="profile-image">
              <span class="edit-icon">
                <i data-feather="edit-2"></i>
              </span>
            </div>
            <span class="name d-none">Francesco Buonvicino</span>
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