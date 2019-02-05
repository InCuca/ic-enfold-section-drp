<?php
/**
 * Plugin Name:     Enfold Section Tabs with Dropdown
 * Plugin URI:      https://incuca.net
 * Description:     Turns Tabs of Section Tabs into a dropdown by use of dropdown-on-mobile and dropdown-on-desktop classes
 * Author:          INCUCA
 * Author URI:      https://incuca.net
 * Text Domain:     ic-enfold-section-drp
 * Version:         0.1.0
 *
 * @package         Ic_Enfold
 */

function ic_enfold_section_drp_scripts() {
    $plugin_dir = plugin_dir_url(__FILE__);
    wp_enqueue_script( 'ic-enfold-section-drp' , $plugin_dir.'main.js' , array(), false );
}
add_action('wp_enqueue_scripts', 'ic_enfold_section_drp_scripts');