const apiUrl = 'https://jsonplaceholder.typicode.com';

function fetchPostById(postId) {
  return fetch(`${apiUrl}/posts/${postId}`).then(response => {
    if (!response.ok) {
      throw new Error('Post not found');
    }
    return response.json();
  });
}

function fetchCommentsByPostId(postId) {
  return fetch(`${apiUrl}/posts/${postId}/comments`).then(response => {
    if (!response.ok) {
      throw new Error('Comments not found');
    }
    return response.json();
  });
}

function renderPost(post) {
  const postElement = document.createElement('div');
  postElement.innerHTML = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <button id="comments-btn">Show comments</button>
  `;
  postElement.querySelector('#comments-btn').addEventListener('click', () => {
    fetchCommentsByPostId(post.id)
      .then(comments => {
        const commentsElement = document.createElement('div');
        commentsElement.innerHTML = `
          <h3>Comments</h3>
          ${comments.map(comment => `
            <div>
              <h4>${comment.name}</h4>
              <p>${comment.body}</p>
            </div>
          `).join('')}
        `;
        document.getElementById('comments').appendChild(commentsElement);
      })
      .catch(error => {
        console.error(error);
      });
  });
  document.getElementById('post').appendChild(postElement);
}

async function getPostAndRender(postId) {
    try {
    const post = await fetchPostById(postId);
    renderPost(post);
    } catch (error) {
    console.error(error);
    }
    }
    
    document.getElementById('search-btn').addEventListener('click', () => {
    const postId = parseInt(document.getElementById('post-id').value);
    if (!isNaN(postId) && postId >= 1 && postId <= 100) {
    getPostAndRender(postId);
    }
    });