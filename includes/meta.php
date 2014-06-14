<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="assets/images/logo/favicon.ico">

<?php if (isset($data["meta"]["author"])) { ?>

    <meta name="author" content="<?php echo $data["meta"]["author"] ?>">

<?php } ?>

<meta name="description" content="<?php echo $data["meta"]["description"]; ?>">
<link rel="canonical" href="<?php echo $data["meta"]["canonical"]; ?>">

<meta property="og:url" content="<?php echo $data["meta"]["canonical"]; ?>">
<meta property="og:type" content="<?php echo $data["meta"]["type"]; ?>">
<meta property="og:title" content="<?php echo $data["title"]; ?>">
<meta property="og:image" content="<?php echo $data["base_url"] . $data["meta"]["image"]; ?>"/>
<meta property="og:description" content="<?php echo $data["meta"]["description"]; ?>">
<meta property="og:site_name" content="<?php echo $data["name"]; ?>">

<meta itemprop="name" content="<?php echo $data["title"]; ?>">
<meta itemprop="description" content="Bootstrap 3 has a ton of features and helpers to speed up front-end development. Sometimes you need something and you end up writing your own custom CSS and JavaScript without even realizing that Bootstrap could have done it for you....">
<meta itemprop="image" content="http://scotch.io/wp-content/uploads/2014/05/bs31.jpg">