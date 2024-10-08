# Bootstrap 5 Menu

This menu is adapted for FeatherIcons but is largely icon-library independent.

## Authors
- [Boctulus](boctulus@gmail.com)


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

## Setting a secondary icon

To replace the default angle icon with custom HTML (e.g., rendering a different icon), use the secondary_icon property: 

```javascript
{ 
    text: "Exam list", 
    link: "/dashboard/exam-list", 
    icon: "heart", 
    secondary_icon: "<i data-feather="circle"></i>" 
},
```

## Adding event-handing for the secondary icon

It's your responsability to add "event.stopPropagation();" for your secondary icon, e.g.

```javascript
{ text: "Sign out", 
    link: "/auth/logout",
    icon: "log-out",
    secondary_icon: "<span onclick=\"event.stopPropagation(); alert('Toggling sidebar')\" data-feather='chevrons-right' style='position: absolute; right: 10px;'></span>"
},
```

Or ..

```javascript
{ text: "Sign out", 
    atts: {
    "id": "sign_out",
    "click": "logout();"
    },
    icon: "log-out",
    secondary_icon: "<span onclick=\"event.stopPropagation(); alert('Toggling sidebar')\" data-feather='chevrons-right' style='position: absolute; right: 10px;'></span>"
},
```

In general attributes (id, click and so on) applied through "atts" are for the full div (div.leaf).

Because of the metioned above you need to deattach the events defined for the div to the secondary icon.

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

```javascript
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


## Add direct HTML

It's possible to add blocks of HTML code between other options in the menu, e.g.

```javascript
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
    <span class="name">Francesco Buonvicino</span>
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
}
```

In that case one block or another is shown depending on if the sidebar is collapsed (compact version) or expanded.

It's possible also to specify only the html block:

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
    <span class="name d-none">Pablo Bozzolo</span>
    </div>
    `
},

In this last case the block will be always visible.


## Hooks --new feature--

You can "subscribe" to the events for sidebar expansion and collapse using setOnExpandHandler() and setOnCollapseHandler() methods respectivly. 

```javascript
const menu = new AsideMenu(menu_items, menu_config);
       
menu.setOnExpandHandler(() => {
    console.log('The sidebar has been expanded');a
});

menu.setOnCollapseHandler(() => {
    console.log('The sidebar has been collapsed');
});

menu.init();      
```


## CSS adjustments

If you need a transparent sidebar you can use it but you will need to adjust also the z-index property to avoid it overlaps the navbar. Like this:

```css
#sidebar {
    color: #b8c7ce;
    background-color: rgba(0,0,0,0.85); /* transparent */
    z-index: 1000;  /* sidebar below the navbar */
}
```

If for the contrary you want the sidbar occupy the full height then you will need to adjust like this:

```css
#sidebar {
    color: #b8c7ce;
    background-color: rgba(0,0,0); /* solid color */
    z-index: 5000;  /* sidebar above the navbar */
}
```