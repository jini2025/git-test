// Product 클래스
class Product {
  constructor(name, description, price, tags, images, favoriteCount = 0) {
    this.name = name;
    this.description = namdescriptione;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this._favoriteCount = favoriteCount;
  }
  favorit() {
    this._favoriteCount += 1;
  }
  set favoriteCount(value) {
    throw new Error("favorit()를 호출해서 변경해주세요.");
  }
  get favoriteCount() {
    return this._favoriteCount;
  }
}

// ElectronicProduct 클래스 (Product를 상속) +manufacturer(제조사) 프로퍼티
class ElectronicProduct extends Product {
  constructor(
    name,
    description,
    price,
    tags,
    images,
    favoriteCount = 0,
    manufacturer = null // 추가
  ) {
    super(name, description, price, tags, images, favoriteCount);
    this.manufacturer = manufacturer;
  }
}

//Article 클래스
class Article {
  constructor(title, content, writer = "", likeCount = 0) {
    this.title = title;
    this.content = content;
    this.writer = writer;
    this._likeCount = likeCount;
    this.createdAt = new Date(); // 심화요구사항
  }
  like() {
    this._likeCount += 1;
  }
  set likeCount(value) {
    throw new Error("like() 를 호출해서 변경해주세요.");
  }
  get likeCount() {
    return this._likeCount;
  }
}

// Article API를 이용
// getArticleList() : GET 메소드
function getArticleList() {
  const url = new URL("https://panda-market-api-crud.vercel.app/articles");
  url.searchParams.append("page", 1);
  url.searchParams.append("pageSize", 10);
  url.searchParams.append("keyword", "");

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.error("에러 발생 : ", res.status, res.statusText);
        throw new Error("네트워크 응답이 실패했습니다.");
      }
      return res.json();
    })
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      console.log(error);
    });
}

getArticleList();

//getArticle() : GET 메소드 + {id}
function getArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`)
    .then((res) => {
      if (!res.ok) {
        console.error("에러 발생 : ", res.status, res.statusText);
        throw new Error("네트워크 응답이 실패했습니다.");
      }
      return res.json();
    })
    .then((body) => {
      console.log(body);
      return body.id;
    })
    .catch((error) => {
      console.log(error);
    });
}

//createArticle() : POST 메소드
function createArticle() {
  fetch(`https://panda-market-api-crud.vercel.app/articles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "화이팅",
      content: "버티자",
      image: "https://example.com/...",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error("에러 발생 : ", res.status, res.statusText);
        throw new Error("네트워크 응답이 실패했습니다.");
      }
      return res.json();
    })
    .then((body) => {
      return body.id;
    })
    .then((id) => {
      return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`);
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      console.log(error);
    });
}

createArticle();

//patchArticle() : PATCH 메소드
function patchArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "화이또",
      content: "견디자",
    }),
  })
    .then((res) => {
      if (!res.ok) {
        console.error("에러 발생 : ", res.status, res.statusText);
        throw new Error("네트워크 응답이 실패했습니다.");
      }
      return res.json();
    })
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      console.log(error);
    });
}

patchArticle(238);

//deleteArticle() : DELETE 메소드
function patchArticle(id) {
  fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        console.error("에러 발생 : ", res.status, res.statusText);
        throw new Error("네트워크 응답이 실패했습니다.");
      }
      return res.json();
    })
    .then((body) => {
      console.log(body);
    })
    .catch((error) => {
      console.log(error);
    });
}

patchArticle(262);

// Product API를 이용
// getProductList() : GET 메소드
async function getProductList(page, pageSize, keyword) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log("error occured");
    console.log(err);
  }
}

getProductList();

// getProduct() : GET 메소드 + {id}
async function getProduct(id) {
  try {
    const response = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`
    );
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log("error occured");
    console.log(err);
  }
}

getProduct(271);

//createProduct() : POST 메소드
async function createProduct(name, description, price, tags, images) {
  try {
    const postRes = await fetch(
      `https://panda-market-api-crud.vercel.app/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
          tags,
          images,
        }),
      }
    );
    const id = (await postRes.json()).id;

    const getRes = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`
    );
    const data = await getRes.json();
    console.log(data);
  } catch (err) {
    console.log("error occured");
    console.log(err);
  }
}

createProduct(
  "서울",
  "대한민국 수도",
  0,
  "성수, 홍대, 이태원",
  "https://example.com/...,"
);

// patchProduct() : PATCH 메소드
async function patchProduct(id, name, description, price) {
  try {
    const patchRes = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          price,
        }),
      }
    );
    const data = await patchRes.json();
    console.log(data);
  } catch (err) {
    console.log("error occured");
    console.log(err);
  }
}

patchProduct(292, "모자", "최신 유행", 0);

// deleteProduct() : DELETE 메소드
async function deleteProduct(id) {
  try {
    const deleteRes = await fetch(
      `https://panda-market-api-crud.vercel.app/products/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await deleteRes.json();
    console.log(data);
  } catch (err) {
    console.log("error occured");
    console.log(err);
  }
}

deleteProduct(292);
