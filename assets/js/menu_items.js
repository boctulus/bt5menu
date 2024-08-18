const menu_items = { 
    admin:  [
        { 
          text: "Exam list", 
          link: "/dashboard/exam-list", 
          icon: "heart", 
          counter: 99, 
          /* html: "<span class=\"counter\">16</span>" */
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
            { text: "Item 1", link: "/dashboard/integration-layer/item1", icon: "layers" }
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
        { text: "Exam list", link: "/dashboard/exam-list", icon: "heart", /* "separator": true */ },
        { text: "Fast reporting", link: "/dashboard/fast-reporting", icon: "zap" },
        { text: "Info", link: "javascript:alert('System is operational')", icon: "info" }
    ]
};       