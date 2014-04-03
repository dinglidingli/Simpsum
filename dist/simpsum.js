(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.Simpsum = (function() {
    function Simpsum(dataSourceLink, variableTag) {
      if (variableTag == null) {
        variableTag = "simpsum";
      }
      this.dataSourceLink = dataSourceLink;
      this.regex = new RegExp("\\{{2}\\s{1,}(" + variableTag + ")(\\([0-9, ]{1,}\\))?\\s{1,}\\}{2}");
      this.allowedNodes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI'];
      this.headingNodes = this.allowedNodes.slice(0, 6);
      this.nodesToChange = [];
      this.findAllowedNodes(document.body);
      this.getContent();
    }

    Simpsum.prototype.findAllowedNodes = function(node) {
      var child, key, matchedValue, max, min, range, replaceType, _ref, _ref1, _ref2, _results;
      if ((_ref = node.nodeName, __indexOf.call(this.allowedNodes, _ref) >= 0) && this.regex.test(node.innerHTML)) {
        this.nodesToChange.push({
          element: node,
          characterLimit: 0
        });
        if (/\([0-9, ]{1,}\)/.test(node.innerHTML)) {
          matchedValue = node.innerHTML.match(/\((.*?)\)/);
          if (matchedValue[1].split(",").length > 0) {
            range = matchedValue[1].split(",");
            min = parseInt(range[0]);
            max = parseInt(range[1]);
            this.nodesToChange[this.nodesToChange.length - 1].characterLimit = Math.floor(Math.random() * (max - min + 1)) + min;
          } else {
            this.nodesToChange[this.nodesToChange.length - 1].characterLimit = parseInt(matchedValue[1]);
          }
        }
        if (_ref1 = node.nodeName, __indexOf.call(this.headingNodes, _ref1) >= 0) {
          replaceType = 'heading';
        } else {
          replaceType = 'paragraph';
        }
        return this.nodesToChange[this.nodesToChange.length - 1].type = replaceType;
      } else {
        _ref2 = node.childNodes;
        _results = [];
        for (key in _ref2) {
          child = _ref2[key];
          _results.push(this.findAllowedNodes(child));
        }
        return _results;
      }
    };

    Simpsum.prototype.getContent = function() {
      return this.loadDummyText(this.setContent);
    };

    Simpsum.prototype.loadDummyText = function(callback) {
      var nodes, req;
      req = new XMLHttpRequest();
      nodes = this.nodesToChange;
      req.addEventListener('readystatechange', function() {
        var dummyContent, successResultCodes, _ref;
        if (req.readyState === 4) {
          successResultCodes = [200, 304];
          if (_ref = req.status, __indexOf.call(successResultCodes, _ref) >= 0) {
            dummyContent = JSON.parse(req.responseText);
            return callback(nodes, dummyContent);
          } else {
            return console.log('Error loading data...');
          }
        }
      });
      req.open('GET', this.dataSourceLink, false);
      return req.send();
    };

    Simpsum.prototype.setContent = function(nodes, dummyContent) {
      var newContent, newContentString, node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        switch (node.type) {
          case "heading":
            newContent = dummyContent.headings;
            break;
          case "paragraph":
            newContent = dummyContent.paragraphs;
        }
        newContentString = newContent[Math.floor(Math.random() * newContent.length)];
        _results.push(node.element.innerHTML = node.characterLimit === 0 ? newContentString : newContentString.substring(0, node.characterLimit));
      }
      return _results;
    };

    return Simpsum;

  })();

}).call(this);
