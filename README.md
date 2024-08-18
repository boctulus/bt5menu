# BT5 Menu

This menu is adapted for FeatherIcons but is largely icon-library independent.

## Authors
- [Boctulus]()


## Using the AsideMenu Class

The AsideMenu class is straightforward to use. Below is a basic example of how to configure and initialize it:

```javascript
const menu_config = {
    "starts_expanded": false,
    "options_starts_expanded": false,  /* it has only effect if starts_expanded is true */
    "role": "current"
};

const menu_items = { 
    current:  [
        { 
          text: "Exam list", 
          link: "/dashboard/exam-list", 
          icon: "heart"
        },
        { text: "Fast reporting", link: "/dashboard/fast-reporting", icon: "zap" },
        { text: "Settings",  
          childs: [ 
            { text: "Item 1", link: "/dashboard/settings/item1", icon: "sliders" }, 
            { text: "Item 2", link: "/dashboard/settings/item2", icon: "sliders" }, 
            { text: "Item 3", link: "/dashboard/settings/item3", icon: "sliders" }
          ],
          icon: "sliders"
        },
        { text: "Info", link: "javascript:alert('System is operational')", icon: "info" }
    ],
};   

// Initialize AsideMenu
const menu = new AsideMenu(menu_items, menu_config);
menu.init();        


// Feather icons replacement (if they are in use)
document.addEventListener('DOMContentLoaded', () => {            
    feather.replace();
});
```

## User Role Handling

The class is designed to manage different user-role menus. However, it is recommended to avoid sending menu options for roles other than the current logged-in user to prevent exposing potentially unprotected URLs.

Example for a different role configuration:

```javascript
const menu_config = {
    "starts_expanded": false,
    "options_starts_expanded": false,  /* it has only effect if starts_expanded is true */
    "role": "manager"
};

const menu_items = { 
    admin:  [
        { 
          text: "Exam list", 
          link: "/dashboard/exam-list", 
          icon: "heart"
        },
        { text: "Fast reporting", link: "/dashboard/fast-reporting", icon: "zap" },
        { text: "Settings",  
          childs: [ 
            { text: "Item 1", link: "/dashboard/settings/item1", icon: "sliders" }, 
            { text: "Item 2", link: "/dashboard/settings/item2", icon: "sliders" }, 
            { text: "Item 3", link: "/dashboard/settings/item3", icon: "sliders" }
          ],
          icon: "sliders"
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
```

## Adding a Horizontal Separator

You can add a horizontal separator between menu items using the separator property:

```javascript
{ 
    text: "Exam list", 
    link: "/dashboard/exam-list", 
    icon: "heart", 
    "separator": true 
},
```

## Setting Custom HTML for Icons

To replace the default angle icon with custom HTML (e.g., rendering a different icon), use the html property: 

```javascript
{ 
    text: "Exam list", 
    link: "/dashboard/exam-list", 
    icon: "heart", 
    html: "<i data-feather="circle"></i>"  /* secondary icon */
},
```

## Set a counter

You can set a counter for the menu using the .setCounter() method. This method automatically handles rounding for numbers larger than 99:

```javascript
menu.setCounter(5)
```

This approach ensures that your menu is flexible, easy to configure, and adaptable to various user roles and display needs.

## Set custom attributes

Setting attributes like "id" or events click "onclick" is done by "atts" on any leaf (node without descendents) of the menu.

```javascript
text: "Integration Layer",  
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
```

and of course the callback must be defined, e.g

```
function my_callback(obj) {
    console.log(obj);
    alert('here');
}
```

In brief there are many ways to enable calling Javascript code:

- Adding ids as "atts" and then event handlers
- With "Javascript url", .e.g

```
text: "Info", link: "javascript:alert('System is operational')", icon: "info" }
```

- Adding event inline defining custom attributes.
