# OADA Formats Visualization 
===================================

This repo provides a webpage that can view and interact with an
oada-formats repository to navigate it's terms, types, links, and examples.

To include a custom oada-formats repository for visualization, you need
to add that repo as a submodule to this one:
```
cd top_of_this_repo
git submodule add <path_or_url_to_repo> format-repos/<name_of_repo>
```
That will make a folder under format-repos/ which will be included in the
page's known format schemes. 
