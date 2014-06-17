<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="<?php echo $data["meta"]["favicon"]; ?>">

<?php if (isset($data["meta"]["author"])) { ?>

    <meta name="author" content="<?php echo $data["meta"]["author"] ?>">

<?php } ?>

<meta name="description" content="<?php echo $data["meta"]["description"]; ?>">
<meta name="keywords" content="<?php echo $data["meta"]["keywords"]; ?>">
<link rel="canonical" href="<?php echo $data["meta"]["canonical"]; ?>">

<meta property="og:url" content="<?php echo $data["meta"]["canonical"]; ?>">
<meta property="og:type" content="<?php echo $data["meta"]["type"]; ?>">
<meta property="og:title" content="<?php echo $data["title"]; ?>">
<meta property="og:image" content="<?php echo $data["meta"]["image"]; ?>">
<meta property="og:description" content="<?php echo $data["meta"]["description"]; ?>">
<meta property="og:site_name" content="<?php echo $data["name"]; ?>">

<meta itemprop="name" content="<?php echo $data["title"]; ?>">
<meta itemprop="description" content="<?php echo $data["meta"]["description"]; ?>">
<meta itemprop="image" content="<?php echo $data["meta"]["image"]; ?>">