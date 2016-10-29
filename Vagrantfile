# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.ssh.insert_key = false

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
  end

  config.vm.provider "virtualbox" do |vb|
    # Limit the specs of the virtual enviroment when you want to simulate
    # the performance in a low tier cloud host
    # vb.cpus = 1
    vb.memory = "512"
    # vb.customize ["modifyvm", :id, "--cpuexecutioncap", "50"]
  end

  config.vm.define "service" do |node|
    node.vm.hostname = "service"
    node.vm.network "private_network", ip: "10.20.1.100"
    node.vm.synced_folder ".", "/repo"
  end

  config.vm.define "dependencies" do |node|
    node.vm.hostname = "dependencies"
    node.vm.network "private_network", ip: "10.20.1.2"
    node.vm.synced_folder ".", "/vagrant", disabled: true
  end
end
