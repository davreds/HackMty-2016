<html>
	<body>
		<h1><?php echo $post->title; ?></h1>
		<p>Posted on <?php echo strftime("%B %e, %Y", $post->created); ?></p>
		<p><?php echo $post->content; ?></p>
	</body>
</html>