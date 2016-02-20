<html>
<body>
	<h1>Update Post</h1>
	<form action="<?php echo Url::action('PostsController::update',$post->id); ?>" method="POST">
		<fieldset>
			<label for="title">Title</label><br/>
			<input type="text" id="title" name="post[title]" value="<?php echo $post->title; ?>"/><br/>	
			<label for="content">Content</label><br/>
			<textarea id="content" name="post[content]" rows="20" cols="50"><?php echo $post->content; ?></textarea><br/>
			<input type="hidden" name="_METHOD" value="PUT"/>
			<input type="submit" value="Update Post"/>
		</fieldset>
	</form>
</body>
</html>