<html>
	<body>
		<h1>Posts</h1>
		<ul>
			<?php foreach( $posts as $post ): ?>
			<li>
				<h2><a href="<?php echo Url::action('PostsController::show',$post->id); ?>"><?php echo $post->title; ?></a></h2>
				<p>Posted on <?php echo $post->created; ?></p>
				<p><?php echo $post->content; ?></p>
				<p>
					<a href="<?php echo Url::action('PostsController::edit',$post->id); ?>">Edit</a>
					<a href="<?php echo Url::action('PostsController::delete',$post->id); ?>" onclick="return confirm('Are you sure?');">Delete</a>
				</p>
			</li>
			<?php endforeach; ?>
		</ul>
		<a href="<?php echo Url::action('PostsController::write'); ?>">Write</a>
	</body>
</html>