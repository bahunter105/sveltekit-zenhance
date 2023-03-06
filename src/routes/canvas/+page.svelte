<script>
  import Konva from 'konva'
  import {onMount} from "svelte"
  import {onDestroy} from "svelte"
  import plusCircleSVG from '$lib/images/plus-circle.svg'
  import createPersonSVG from '$lib/images/Create Person.svg'
  import createTeamSVG from '$lib/images/Create Team.svg'
  import {addNewTeamGroup, getAngleXYCordinates, addNewPerson} from '$lib/functions/newTeamGroup.js'

  import { currentUser, pb } from '$lib/pocketbase';

  export let data;
  // console.log(data)
  const organization = data.organization
  const groups = data.organization.expand.groups
  const teams = data.organization.expand['teams(organization)']


  let stage
  let layer
  // set an Array of Shapes
  // let shapesArray = []

  onMount(()=> {
    stage = new Konva.Stage({
      container: 'canvas',
      width: innerWidth,
      height: innerHeight,
    });

    layer = new Konva.Layer();
    stage.add(layer)

    // add transform layer
    // let tr = new Konva.Transformer();
    // layer.add(tr);

    // call XY coordinates of plusCircle for later use
    let plusCircleX = stage.width() * 0.0825
    let plusCircleY = stage.height() * 0.55

    // add the plusCircle
    let plusCirlceImageObj = new Image();
    plusCirlceImageObj.onload = function () {
      let plusCircle = new Konva.Image({
        image:plusCirlceImageObj,
        x: plusCircleX,
        y: plusCircleY,
        // x: stage.width() / 2,
        // y: stage.height() / 2,
        offsetX:50,
        offsetY: 50,
        width: 100,
        height: 100,
        // draggable: true,
        id: 'plusCircle'
      });

      // add the shape to the layer
      layer.add(plusCircle);

      plusCircle.on('pointerdown', function () {
        let createPerson = stage.findOne("#createPerson")
        let createTeam = stage.findOne("#createTeam")
        if (createPerson.visible() === true) {
          createPerson.hide()
          createTeam.hide()
        } else {
          createPerson.show()
          createTeam.show()
        }
      })

      // add cursor styling
      plusCircle.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      plusCircle.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });
    };
    plusCirlceImageObj.src = plusCircleSVG

    // add createPerson
    Konva.Image.fromURL(createPersonSVG, (imageNode) => {
      layer.add(imageNode);
      imageNode.setAttrs({
        // x = radius * Math.cos(Math.PI * angle / 180);
        // y = radius * Math.sin(Math.PI * angle / 180);
        x: plusCircleX + 100 * Math.cos(Math.PI * 60 / 180),
        y: plusCircleY + 100 * Math.sin(Math.PI * 60 / 180),
        // x: 0,
        // y: 0,
        width: 66,
        height: 66,
        offsetX: 33,
        offsetY: 33,
        // draggable: true,
        visible: false,
        id:"createPerson",
      });

      // add cursor styling
      imageNode.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      imageNode.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });

      imageNode.on('pointerdown', function () {
        // document.querySelector("#my-modal-3").checked = true
        let createPerson = stage.findOne("#createPerson")
        let createTeam = stage.findOne("#createTeam")
        if (createPerson.visible() === true) {
          createPerson.hide()
          createTeam.hide()
        } else {
          createPerson.show()
          createTeam.show()
        }
      })

      // shapesArray.push(imageNode)
    });

    // add createTeam
    Konva.Image.fromURL(createTeamSVG, (imageNode) => {
      layer.add(imageNode);
      imageNode.setAttrs({
        // x = radius * Math.cos(Math.PI * angle / 180);
        // y = radius * Math.sin(Math.PI * angle / 180);
        x: plusCircleX + 100 * Math.cos(Math.PI * 0 / 180),
        y: plusCircleY + 100 * Math.sin(Math.PI * 0 / 180),
        // x: 0,
        // y: 0,
        width: 66,
        height: 66,
        offsetX: 33,
        offsetY: 33,
        // draggable: true,
        visible: false,
        id:"createTeam",
      });

      // add cursor styling
      imageNode.on('mouseover', function () {
        document.body.style.cursor = 'pointer';
      });
      imageNode.on('mouseout', function () {
        document.body.style.cursor = 'default';
      });

      // add addNewTeamGroup function
      imageNode.on('pointerdown', function () {
        let numberOfSiblings = stage.find('#teamGroup').length
        // set max number of teams to 8
        if (numberOfSiblings <= 7) {
          document.querySelector("#my-modal-3").checked = true
          // let coordinates = getAngleXYCordinates(plusCircleX, plusCircleY, 375, numberOfSiblings)
          // addNewTeamGroup(layer, coordinates)
        }
        let createPerson = stage.findOne("#createPerson")
        let createTeam = stage.findOne("#createTeam")
        if (createPerson.visible() === true) {
          createPerson.hide()
          createTeam.hide()
        } else {
          createPerson.show()
          createTeam.show()
        }
      })

      // shapesArray.push(imageNode)
    });

    let newTeamOrbitCircle = new Konva.Circle({
      x: plusCircleX,
      y: plusCircleY,
      radius: 375,
      offsetX: 0,
      offsetY: 0,
      fill: 'rgba(0,0,255,0)',
      stroke: 'rgb(255, 168, 0, 0.5)',
      strokeWidth: 1,
      dash: [1,1]
    });

    layer.add(newTeamOrbitCircle)

    // add teams & people via data
    if (teams != undefined) {
      teams.forEach((teamData, index) => {
        // set max number of teams to 8
        if (index <= 7) {
          let coordinates = getAngleXYCordinates(plusCircleX, plusCircleY, 375, index)
          let teamGroup = addNewTeamGroup(layer, coordinates, teamData)
          let roles = teamData.expand.roles
          if (roles != undefined) {
            roles.forEach((personData, personIndex) => {
              // set max number of team members to 8
              if (index <= 7) {
                let personCoordinates = getAngleXYCordinates(coordinates.x, coordinates.y, 110, personIndex, true)
                addNewPerson(teamGroup, personCoordinates, personData)
              }
            })
          }
        }


      });
    }

    // Zoooooooming
    // by scrolling
    var scaleBy = 1.01;
    stage.on('wheel', (e) => {
      // stop default scrolling
      e.evt.preventDefault();

      var oldScale = stage.scaleX();
      var pointer = stage.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      // how to scale? Zoom in? Or zoom out?
      let direction = e.evt.deltaY > 0 ? 1 : -1;

      // when we zoom on trackpad, e.evt.ctrlKey is true
      // in that case lets revert direction
      if (e.evt.ctrlKey) {
        direction = -direction;
      }

      var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
    });
    // by touch
          function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      }

      function getCenter(p1, p2) {
        return {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
        };
      }
      var lastCenter = null;
      var lastDist = 0;

      stage.on('touchmove', function (e) {
        e.evt.preventDefault();
        var touch1 = e.evt.touches[0];
        var touch2 = e.evt.touches[1];

        if (touch1 && touch2) {
          // if the stage was under Konva's drag&drop
          // we need to stop it, and implement our own pan logic with two pointers
          if (stage.isDragging()) {
            stage.stopDrag();
          }

          var p1 = {
            x: touch1.clientX,
            y: touch1.clientY,
          };
          var p2 = {
            x: touch2.clientX,
            y: touch2.clientY,
          };

          if (!lastCenter) {
            lastCenter = getCenter(p1, p2);
            return;
          }
          var newCenter = getCenter(p1, p2);

          var dist = getDistance(p1, p2);

          if (!lastDist) {
            lastDist = dist;
          }

          // local coordinates of center point
          var pointTo = {
            x: (newCenter.x - stage.x()) / stage.scaleX(),
            y: (newCenter.y - stage.y()) / stage.scaleX(),
          };

          var scale = stage.scaleX() * (dist / lastDist);

          stage.scaleX(scale);
          stage.scaleY(scale);

          // calculate new position of the stage
          var dx = newCenter.x - lastCenter.x;
          var dy = newCenter.y - lastCenter.y;

          var newPos = {
            x: newCenter.x - pointTo.x * scale + dx,
            y: newCenter.y - pointTo.y * scale + dy,
          };

          stage.position(newPos);

          lastDist = dist;
          lastCenter = newCenter;
        }
      });

      stage.on('touchend', function () {
        lastDist = 0;
        lastCenter = null;
      });

    // Drag and Select feature
    // var selectionRectangle = new Konva.Rect({
    //   fill: 'rgba(0,0,255,0.5)',
    //   visible: false,
    // });
    // layer.add(selectionRectangle);

    // var x1, y1, x2, y2;
    // stage.on('mousedown touchstart', (e) => {
    //   // do nothing if we mousedown on any shape
    //   if (e.target !== stage) {
    //     return;
    //   }
    //   e.evt.preventDefault();
    //   x1 = stage.getPointerPosition().x;
    //   y1 = stage.getPointerPosition().y;
    //   x2 = stage.getPointerPosition().x;
    //   y2 = stage.getPointerPosition().y;

    //   selectionRectangle.visible(true);
    //   selectionRectangle.width(0);
    //   selectionRectangle.height(0);
    // });

    // stage.on('mousemove touchmove', (e) => {
    //   // do nothing if we didn't start selection
    //   if (!selectionRectangle.visible()) {
    //     return;
    //   }
    //   e.evt.preventDefault();
    //   x2 = stage.getPointerPosition().x;
    //   y2 = stage.getPointerPosition().y;

    //   selectionRectangle.setAttrs({
    //     x: Math.min(x1, x2),
    //     y: Math.min(y1, y2),
    //     width: Math.abs(x2 - x1),
    //     height: Math.abs(y2 - y1),
    //   });
    // });

    // stage.on('mouseup touchend', (e) => {
    //   // do nothing if we didn't start selection
    //   if (!selectionRectangle.visible()) {
    //     return;
    //   }
    //   e.evt.preventDefault();
    //   // update visibility in timeout, so we can check it in click event
    //   setTimeout(() => {
    //     selectionRectangle.visible(false);
    //   });

    //   // var shapes = stage.find('.rect');
    //   var shapes = shapesArray;
    //   var box = selectionRectangle.getClientRect();
    //   var selected = shapes.filter((shape) =>
    //     Konva.Util.haveIntersection(box, shape.getClientRect())
    //   );
    //   tr.nodes(selected);
    // });

    // // clicks should select/deselect shapes
    // stage.on('click tap', function (e) {
    //   // if we are selecting with rect, do nothing
    //   if (selectionRectangle.visible()) {
    //     return;
    //   }

    //   // if click on empty area - remove all selections
    //   if (e.target === stage) {
    //     tr.nodes([]);
    //     return;
    //   }

    //   // do nothing if clicked NOT on our rectangles
    //   // if (!e.target.hasName('rect')) {
    //   //   return;
    //   // }

    //   // do we pressed shift or ctrl?
    //   const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    //   const isSelected = tr.nodes().indexOf(e.target) >= 0;

    //   if (!metaPressed && !isSelected) {
    //     // if no key pressed and the node is not selected
    //     // select just one
    //     tr.nodes([e.target]);
    //   } else if (metaPressed && isSelected) {
    //     // if we pressed keys and node was selected
    //     // we need to remove it from selection:
    //     const nodes = tr.nodes().slice(); // use slice to have new copy of array
    //     // remove node from array
    //     nodes.splice(nodes.indexOf(e.target), 1);
    //     tr.nodes(nodes);
    //   } else if (metaPressed && !isSelected) {
    //     // add the node into selection
    //     const nodes = tr.nodes().concat([e.target]);
    //     tr.nodes(nodes);
    //   }
    // });

    // Change scale to fit entire circle
    stage.scale({ x: .85, y: .85 });
  })

  onDestroy(() => {
		if (stage) {
			stage.destroy();
		}
	});
</script>


<div id="canvas"></div>
