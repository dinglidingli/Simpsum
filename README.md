# Simpsum - Simple Lorem Ipsum

Simpsum makes it easy to add reusable placeholder text to your development websites.

This project was created as a way of adding placeholder text to be added to development sites in a consistent fashion. It also aims to solve the problem of forgetting to remove or change placeholder text before deployment by allowing developers to easily find and replace the consistent tags.

## Installation

Download via bower.

```
bower install simpsum
```

Include the script on your web page.

```
<script src="simpsum.js"></script>
```

Next, call the script. A sample JSON file has been included in the examples folder.

```
<script>
  var simpsum = new Simpsum("path_to_dummy_content.json");
</script>
```

Note: If using a local `.json` file, it will need to be served via a local web server.

## Usage

To set a placeholder section in your website, create a text element and include the `{{ simpsum }}` tag.

```
<h1>{{ simpsum }}</h1>
<p>{{ simpsum }}</p>
```

You can also force your placeholders to have a maximum length. The example below will limit the placeholder to 20 characters.

```
<p>{{ simpsum(20) }}</p>
```

Maximum lengths can also be specified as being of a range for when you want more variance in your selected content (e.g., when simulating user supplied content)

```
<p>{{ simpsum(20,30) }}</p>
```

You can use variable tag names by specifying the desired tag in the second parameter when calling the class:

```
<script>
  var simpsum = new Simpsum("path_to_dummy_content.json", "text");
</script>
```

And the tags can be called like so (in the same fashion as described above):

```
<p>{{ text }}</p>
<p>{{ text(10) }}</p>
<p>{{ text(10,20) }}</p>
```
