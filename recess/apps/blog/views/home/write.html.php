<html>
<body>
	<h1>Write Post</h1>
	<form action="<?php echo Url::action('PostsController::create'); ?>" method="POST">
		<fieldset>
			<label for="title">Title</label><br/>
			<input type="text" id="title" name="post[title]" value=""/><br/>	
			<label for="content">Content</label><br/>
			<textarea id="content" name="post[content]" rows="20" cols="50"></textarea><br/>
			<input type="submit" value="Create Post"/>
		</fieldset>
	</form>
</body>
</html>