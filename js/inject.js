const tbody = document.getElementsByTagName('tbody')[0].outerHTML

function deliver() {
  let selectedIds = $(document.getElementsByTagName('form')[1]).serialize()
  let splitInfo = selectedIds.split('token=')
  let tokenValue = splitInfo[1]
  let ids = splitInfo[0].split('ids=').slice(1).map(arr => arr.slice(0, arr.length - 1))
  if (ids.length == 0) {
    layer.alert("请选中要发货的订单!")
  } else {
    for (let index = 0; index < ids.length; ++index) {
      const orderId = ids[index];
      if (tbody.indexOf("fahuo('" + orderId + "')") == -1) {
        console.log("已发过货的订单: " +  orderId);
        continue;
      }
      deliverGoods(orderId, tokenValue);
    }
    layer.alert("操作成功！",
      function () {
        location.reload()
      })
  }
}

function deliverGoods(orderId, tokenValue) {
  $.ajax({
    url: "fahuo",
    type: "POST",
    data: {
      id: orderId,
      expressCompanyId: -1,
      number: "",
      "rnd": Math.random(),
      "token": tokenValue
    },
    success: function (a) {
      if (a.code == 0) {
        console.log("发货"+ orderId + "操作成功！")
      } else {
        console.log("发货"+ orderId + "操作失败！")
      }
    }
  });
}

function InsertButton() {
    // 要插入按钮的class的
    const insertClass = 'row';

    let buttonNode = document.createElement("button");
    buttonNode.style = "border-style: solid;border-width: 0;cursor: pointer;font-family: inherit;font-weight: bold;line-height: normal;margin:-6px 0px 10px 10px;position: relative;text-decoration: none;text-align: center;display: inline-block;padding-top: 0.75em;padding-right: 1.5em;padding-bottom: 0.8125em;padding-left: 1.5em;font-size: 1em;background-color: #296ca5;border-color: #829606;color: white;"
    buttonNode.innerHTML = '<span>批量发货</span>';
    buttonNode.onclick = deliver;
    document.getElementsByClassName(insertClass)[0].appendChild(buttonNode);
}

InsertButton();
