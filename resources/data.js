class formatDate extends Date {
    constructor(dateStr) {
      super(dateStr);
    }
  
    getFormattedDate() {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
      return `${this.getDate()}-${months[this.getMonth()]}-${this.getFullYear()}`;
    }
  }
  
  console.log(new formatDate('December 05, 1990 23:15:30').getFormattedDate());