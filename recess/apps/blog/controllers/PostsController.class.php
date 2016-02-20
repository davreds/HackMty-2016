<?php
Library::import('recess.framework.controllers.Controller');
Library::import('blog.models.Post');

/**
 * !RespondsWith Layouts
 * !Prefix Routes: /, Views: home/
 */
class PostsController extends Controller {

	/** !Route GET, posts */
	public function listPosts(){
		$post = new Post();
		$this->posts = $post->all();
	}
	
	/** !Route GET, posts/$id */
	public function show($id){
		$post = new Post($id);
		$this->post = $post->find()->first();
	}
	
	/** !Route GET, posts/write */
	public function write(){
		$this->post = new Post();
	}
	
	/** !Route POST, posts */
	public function create(){
		$post = new Post($this->request->post['post']);
		
		if( $post->save() ){
			return $this->redirect($this->urlTo('listPosts'));
		} else {
			return $this->ok('write');
		}
	}
	
	/** !Route GET, posts/$id/edit */
	public function edit($id){
		$post = new Post($id);
		
		if( $post->exists() ){
			$this->post = $post->find()->first();
		} else {
			return $this->redirect($this->urlTo('listPosts'));
		}
	}
	
	/** !Route PUT, posts/$id */
	public function update($id){
		$post = new Post($id);
		
		if( $post->exists() ){
			$this->post = $post->find()->first()->copy($this->request->put['post']);
			if( $this->post->save() ){
				//set a success message if necessary
			}
			return $this->redirect($this->urlTo('edit',$id));
		} else {
			return $this->redirect($this->urlTo('listPosts'));
		}
	}
	
	/**
	 * !Route DELETE, posts/$id
	 * !Route GET, posts/$id/delete
	 */
	public function delete($id){
		$post = new Post($id);
		
		if( $post->exists() ) $post->delete();
		return $this->redirect($this->urlTo('listPosts'));
	}

}
?>