<?php
/**
 * Plugin Name:     Enfold Tabs with Dropdown
 * Plugin URI:      https://incuca.net
 * Description:     Turns Tabs of Tabs and Section Tabs Component into a dropdown by use of dropdown-on-mobile and dropdown-on-desktop classes
 * Author:          INCUCA
 * Author URI:      https://incuca.net
 * Text Domain:     ic-enfold-tab-drp
 * Version:         0.3.0
 *
 * @package         Ic_Enfold
 */

function ic_enfold_tab_drp_scripts() {
    $plugin_dir = plugin_dir_url(__FILE__);
    wp_enqueue_style('ic-enfold-tab-drp-css', $plugin_dir . 'main.css');
    wp_enqueue_script( 'ic-enfold-tab-drp' , $plugin_dir.'main.js' , array(), false );
}
add_action('wp_enqueue_scripts', 'ic_enfold_tab_drp_scripts');
