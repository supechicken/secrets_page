export default {
  async fetch(request) {
    switch (request.method) {
      case 'POST':
        const request = await request.json();

        return new Response(JSON.stringify(request), { headers: { 'content-type': 'application/json;charset=UTF-8' } });
      case 'GET':
        return new Response('hello')
    }
  }
};
