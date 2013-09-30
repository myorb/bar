define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        EmployeeListView    = require('app/views/EmployeeList'),
        models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.employeeList = new models.EmployeeCollection();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new EmployeeListView({collection: this.employeeList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress",
            "click .search_form": "show_search_form",
            "click .slot_mashine": "show_slot_mashine",
            "click .go_home": "go_home",
        },

        show_search_form: function(event){
            $(".search-bar").toggle();
        },

        show_slot_mashine:function(event){
            $(".topcoat-tab-bar__item, .topcoat-button-bar").hide();
            $('.go_home').show();
        },
        go_home:function(event){
            $(".topcoat-tab-bar__item, .topcoat-button-bar").show();
            $('.go_home').hide();
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.employeeList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }

    });

});