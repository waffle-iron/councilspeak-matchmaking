$(document).ready(function() {
  function formatAgendaItem (item) {
    if (item.loading) return item.text;

    var markup = '<strong>'+item.identifier + ':</strong> ' + item.title + ' (' + item.organization + ', ' + item.upcoming_date + ')';

    return markup;
  }

  $("#deputation_agenda_item_id").select2({
    theme: "bootstrap",
    placeholder: "Search by title, identifier, or committee name",
    width: 'auto',
    ajax: {
      url: '/agenda_items.json',
      dataType: 'json',
      delay: 1000,
      data: function(params) {
        return {
          search: params.term,
          page: params.page
        };
      },
      processResults: function(data, params) {
        // TODO: Add pagination if we need it later.

        return {
          results: data
        };
      },
      cache: true
    },
    escapeMarkup: function(markup) { return markup; },
    templateResult: formatAgendaItem
  });
});
