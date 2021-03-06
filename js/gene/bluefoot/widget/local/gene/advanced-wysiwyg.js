/**
 * - Wysiwyg.js
 * Abstract Field class for our fields
 *
 * @author Dave Macaulay <dave@gene.co.uk>
 */
define(['bluefoot/jquery', 'bluefoot/hook', 'bluefoot/widget/abstract'], function (jQuery, Hook, AbstractField) {

    /**
     * Extend our abstract class
     *
     * @param field
     * @param value
     * @param edit
     * @constructor
     */
    function InputField(field, value, edit) {
        AbstractField.call(this, field, value, edit);
    }
    InputField.prototype = Object.create(AbstractField.prototype);
    var $super = AbstractField.prototype;
    var $elemNumber = Math.floor((Math.random() * 10000) + 1);

    /**
     * Attach hooks for the upload widget
     */
    InputField.prototype.attachHooks = function () {
        Hook.attach('gene-bluefoot-after-render-field-' + this.field.fieldType, this.onRenderField.bind(this), this.edit.stage);
    };

    /**
     * Event to call after the field has been placed onto the screen
     *
     * @param $hook
     */
    InputField.prototype.onRenderField = function ($hook) {

        var elemId = this.getId() + '_' + $elemNumber;
        // Reset random id
        $elemNumber = Math.floor((Math.random() * 10000) + 1);

        var plugins = 'inlinepopups,safari,pagebreak,style,layer,table,advhr,advimage,emotions,iespell,media,searchreplace,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras';

        var settings = {
            schema: 'html5',
            mode: 'exact',
            elements: elemId,
            theme: 'advanced',
            skin: 'bootstrap',
            plugins: plugins,
            theme_advanced_buttons1: 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,forecolor,backcolor,|,sub,sup,bullist,numlist,media,image',
            theme_advanced_buttons2: 'fontsizeselect,|,styleselect',
            theme_advanced_buttons3: 'link,unlink,anchor,|,outdent,indent,blockquote,|, tablecontrols',
            theme_advanced_toolbar_location: 'top',
            theme_advanced_toolbar_align: 'left',
            theme_advanced_statusbar_location: 'bottom',
            theme_advanced_resizing: true,
            theme_advanced_font_sizs : "12px,14px,16px,24px,32px,42px",
            style_formats : [
                {title : 'Arial', inline: 'span', styles : {'font-family' : 'arial,helvetica,sans-serif'}},
                {title : 'Roboto', inline: 'span', styles : {'font-family' : 'Roboto,sans-serif', 'font-weight' : '300'}}
            ],
            convert_urls: false,
            relative_urls: false,
            doctype: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
            setup: function (ed) {
                ed.onChange.add(function (ed, l) {
                    ed.save();
                });
            }
        };

        tinyMCE.init(settings);
        $hook.done();
    };

    /**
     * Build the HTML
     *
     * @returns {boolean}
     */
    InputField.prototype.buildHtml = function () {
        var elemId = this.getId() + '_' + $elemNumber;
        this.element = jQuery('<div />').addClass('gene-bluefoot-input-field').append(
            jQuery('<label />').attr('for', elemId).html(this.getLabel()),
            jQuery('<textarea />').attr('name', this.field.code).attr('id', elemId).val(this.value)
        );

        if (typeof this.field.note !== 'undefined') {
            this.element.append(jQuery('<p />').addClass('gene-bluefoot-note').html(this.field.note));
        }

        return this.element;
    };

    return InputField;
});